# cpflow vs. Terraform: which manages what?

Control Plane ships an official [Terraform provider](https://registry.terraform.io/providers/controlplane-com/cpln/latest),
so it is reasonable to ask whether the `.controlplane/templates/*.yml` files
should be Terraform instead. The short answer for this app: **no**, because the
YAML here covers two concerns and Terraform only addresses one of them.

## Two kinds of YAML in `.controlplane/`

1. **`controlplane.yml`** — cpflow's own config: app/org aliases,
   `app_workloads`, `release_script`, `upstream` (staging→production
   promotion), `match_if_app_name_starts_with`, image retention. **This has no
   Terraform equivalent.** It drives a Heroku-style deploy workflow, not
   infrastructure state.
2. **`templates/*.yml`** — native `cpln apply` resource manifests (GVC,
   workloads, secrets, policies, identities, volume sets). These *could* be
   rewritten as `cpln_*` Terraform resources.

## What Terraform does not replace

The app lifecycle that is cpflow's whole reason to exist:

- `build-image` / `deploy-image` with sequential image tags
- release-phase migrations (`cpflow run --image latest -- rails db:migrate`)
- staging → production promotion
- **ephemeral per-PR review apps** (the `+review-app-deploy` flow + prefix
  matching)

Modeling per-PR environments in Terraform means a workspace and state file per
PR — far heavier than `cpflow setup-app -a qa-react-webpack-rails-tutorial-1234`.

## Decision rule

| Concern | Use |
| --- | --- |
| App build / deploy / release-phase migrations | **cpflow** |
| Ephemeral per-PR review apps | **cpflow** |
| Staging → production promotion | **cpflow** |
| Durable shared infra: orgs, custom domains, mk8s, agents, IAM/policies, external RDS/ElastiCache | **Terraform** (`cpln` provider) |

For a real production system, the two are complementary — Terraform for durable
shared infrastructure, cpflow for the app deploy loop (Control Plane even
publishes a
[GitHub Actions Terraform example](https://github.com/controlplane-com/github-actions-example-terraform)).
This tutorial app has essentially no durable shared infra and exists to
demonstrate the cpflow deploy loop, so it stays entirely on cpflow.

## Appendix: what the templates would look like as HCL

A side-by-side mapping of the current cpflow templates (`templates/app.yml` +
`templates/rails.yml`) to the [`controlplane-com/cpln`](https://registry.terraform.io/providers/controlplane-com/cpln/latest)
provider. The interesting parts are in the comments — they are where the two
models actually diverge.

```hcl
# variables.tf
variable "app_name" {                                    # cpflow injects {{APP_NAME}} per review app;
  type = string                                          # in TF this is a -var or a workspace name.
}
variable "location" {
  type    = string
  default = "aws-us-east-2"
}
# cpflow's {{APP_IMAGE_LINK}} is set at *deploy* time by `deploy-image`. In TF the image
# is a plain argument, so each image bump is its own `terraform apply` (plan + state lock)
# rather than a one-shot `deploy-image` call.
variable "image_link" {
  type = string
}

# gvc.tf  —  was templates/app.yml (kind: gvc + kind: identity)
resource "cpln_gvc" "app" {
  name      = var.app_name
  locations = [var.location]                            # was staticPlacement.locationLinks: [{{APP_LOCATION_LINK}}]

  # was spec.env: (a list of {name,value}); in TF it is a flat map.
  env = {
    # Placeholder credentials mirror templates/app.yml; in production set DATABASE_URL via a
    # sensitive var or a cpln://secret ref (like RENDERER_PASSWORD below) — never embed a real password.
    DATABASE_URL             = "postgres://the_user:the_password@postgres.${var.app_name}.cpln.local:5432/${var.app_name}"
    REDIS_URL                = "redis://redis.${var.app_name}.cpln.local:6379"
    RAILS_ENV                = "production"
    NODE_ENV                 = "production"
    RAILS_SERVE_STATIC_FILES = "true"
    # Placeholder is fine for test apps (matches templates/app.yml); in production set
    # SECRET_KEY_BASE via a sensitive var or a cpln://secret ref (see the two lines
    # below) — never commit a literal secret to an env map.
    SECRET_KEY_BASE          = "placeholder_secret_key_base_for_test_apps_only"
    RENDERER_PORT            = "3800"
    RENDERER_LOG_LEVEL       = "info"
    RENDERER_WORKERS_COUNT   = "1"
    RENDERER_SERVER_BUNDLE_CACHE_PATH = "/app/renderer/.node-renderer-bundles"
    RENDERER_URL             = "http://node-renderer.${var.app_name}.cpln.local:3800"
    RENDERER_HOST            = "0.0.0.0"
    ROLLING_DEPLOY_PREVIOUS_URLS = "https://${var.app_name}.cpln.app/react_on_rails_pro/rolling_deploy"
    RSC_SUSPENSE_DEMO_DELAY  = "true"
    # cpln:// secret references are just strings, so they port over verbatim:
    RENDERER_PASSWORD          = "cpln://secret/${var.app_name}-secrets.RENDERER_PASSWORD"
    ROLLING_DEPLOY_TOKEN       = "cpln://secret/${var.app_name}-secrets.ROLLING_DEPLOY_TOKEN"
    REACT_ON_RAILS_PRO_LICENSE = "cpln://secret/${var.app_name}-secrets.REACT_ON_RAILS_PRO_LICENSE"
  }
}

resource "cpln_identity" "app" {                         # was the second doc in app.yml (kind: identity)
  gvc  = cpln_gvc.app.name
  name = "${var.app_name}-identity"
}

# rails.tf  —  was templates/rails.yml (kind: workload)
resource "cpln_workload" "rails" {
  gvc           = cpln_gvc.app.name
  name          = "rails"
  type          = "standard"
  identity_link = cpln_identity.app.self_link            # was identityLink: {{APP_IDENTITY_LINK}}

  container {
    name        = "rails"
    image       = var.image_link                         # was {{APP_IMAGE_LINK}}
    cpu         = "300m"
    memory      = "1Gi"
    inherit_env = true                                   # pulls the GVC env above
    env         = { LOG_LEVEL = "debug" }

    ports {
      protocol = "http"                                  # keep http — Thruster does HTTP/2 on the TLS frontend
      number   = 3000                                     # an integer, not a string (matches templates/rails.yml)
    }
  }

  options {
    capacity_ai = true
    autoscaling {
      max_scale = 1                                      # maxScale 1 ≈ a single Heroku dyno (other fields default)
    }
  }

  firewall_spec {
    external {
      inbound_allow_cidr  = ["0.0.0.0/0"]                # mirrors templates/rails.yml; tighten for production
      outbound_allow_cidr = ["0.0.0.0/0"]                # likewise — scope outbound to known egress in real apps
    }
  }
}
```

`templates/postgres.yml`, `templates/redis.yml`, and `templates/daily-task.yml`
follow the same pattern (`cpln_workload` + `cpln_secret` + `cpln_policy` +
`cpln_volumeset`). The mechanical translation is straightforward — the field
names line up almost 1:1; see the
[`cpln` provider docs](https://registry.terraform.io/providers/controlplane-com/cpln/latest/docs)
for the exact attribute names of each resource.

What the comments are really showing: the three things cpflow gives you for free
(`{{APP_NAME}}` per-PR interpolation, deploy-time `{{APP_IMAGE_LINK}}`
injection, and the implicit "provision ≠ deploy" separation) all become *your*
problem in Terraform. The image being a plain argument is the big one: in
cpflow, `deploy-image` bumps the running tag without touching infra; in
Terraform, a new image means a `terraform apply` — only that one argument changes,
but the full plan / state-lock cycle still runs. And none of `controlplane.yml`
(release script, upstream promotion, review-app prefix matching) has any
representation above at all.
