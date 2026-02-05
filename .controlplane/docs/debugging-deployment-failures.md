# Debugging Deployment Failures on Control Plane

This guide documents common deployment issues and how to debug them using the Control Plane MCP (Model Context Protocol) tools.

## Case Study: Staging Crash (February 2026)

### Symptoms

- Site returning 503 errors
- Container in crash loop (134+ restarts)
- Exit code 1 with no obvious error message in Control Plane UI

### Root Causes Found

Two issues were identified:

#### 1. Capacity AI Memory Starvation

**Problem:** Capacity AI reduced memory from 512Mi to 32Mi, which is insufficient for a Rails application to boot.

**How it happened:**
- Container crashed during startup (due to issue #2 below)
- Capacity AI observed low memory usage before crash
- Capacity AI reduced memory allocation
- Smaller allocation caused faster crashes
- Feedback loop continued until memory was reduced to 32Mi

**Fix:**
```bash
# Disable Capacity AI and reset memory via MCP tools:
mcp__cpln__update_workload(
  gvc="react-webpack-rails-tutorial-staging",
  name="rails",
  capacityAI=false,
  memory="512Mi",
  cpu="300m"
)
```

#### 2. Missing SECRET_KEY_BASE Environment Variable

**Problem:** Rails 8.1+ requires `SECRET_KEY_BASE` at runtime. Previous versions were more lenient.

**Error in logs:**
```
Missing `secret_key_base` for 'production' environment, set this string with `bin/rails credentials:edit` (ArgumentError)
```

**Fix:**
```bash
# Add SECRET_KEY_BASE to the GVC environment:
# Generate key: openssl rand -hex 64

mcp__cpln__cpln_resource_operation(
  kind="gvc",
  operation="patch",
  name="react-webpack-rails-tutorial-staging",
  body={
    "spec": {
      "env": [
        # ... existing env vars ...
        {"name": "SECRET_KEY_BASE", "value": "<generated-key>"}
      ]
    }
  }
)
```

## Debugging with Control Plane MCP

The Control Plane MCP provides tools for investigating deployment issues without needing direct CLI access.

### Step 1: Set Context

```python
mcp__cpln__set_context(
  org="shakacode-open-source-examples-staging",
  defaultGvc="react-webpack-rails-tutorial-staging"
)
```

### Step 2: Check Workload Status

```python
# List all workloads
mcp__cpln__list_workloads(gvc="react-webpack-rails-tutorial-staging")

# Get deployment status for a specific workload
mcp__cpln__get_workload_deployments(
  gvc="react-webpack-rails-tutorial-staging",
  name="rails"
)
```

**Key fields to check:**
- `status.ready` - Is the deployment healthy?
- `status.versions[].containers.rails.restarts` - How many restarts?
- `status.versions[].containers.rails.resources.memory` - Current memory allocation
- `status.message` - Error messages

### Step 3: Check Events

```python
mcp__cpln__get_workload_events(
  gvc="react-webpack-rails-tutorial-staging",
  name="rails"
)
```

Events show Capacity AI changes, errors, and other significant occurrences.

### Step 4: Check Container Logs

Use cpflow CLI to get actual container logs:

```bash
cpflow logs -a react-webpack-rails-tutorial-staging
```

This reveals application-level errors like missing environment variables.

### Step 5: Check GVC Environment

```python
mcp__cpln__cpln_resource_operation(
  kind="gvc",
  operation="get",
  name="react-webpack-rails-tutorial-staging"
)
```

Verify all required environment variables are present in `spec.env`.

### Step 6: Check Dependencies

Verify postgres and redis are healthy:

```python
mcp__cpln__get_workload_deployments(gvc="...", name="postgres")
mcp__cpln__get_workload_deployments(gvc="...", name="redis")
```

## Common Issues and Fixes

### Issue: Capacity AI Reduces Resources Too Low

**Symptoms:** Crash loop, Capacity AI events showing decreasing memory/CPU

**Fix:**
```python
mcp__cpln__update_workload(
  gvc="...",
  name="rails",
  capacityAI=false,  # Disable Capacity AI
  memory="512Mi",    # Set appropriate memory
  cpu="300m"         # Set appropriate CPU
)
```

### Issue: Missing Environment Variables

**Symptoms:** Exit code 1, application errors in logs

**Fix:** Add missing variables to GVC env via `cpln_resource_operation` patch.

### Issue: Database Connection Failures

**Symptoms:** Connection refused errors in logs

**Check:**
1. Postgres workload is healthy
2. DATABASE_URL is correct in GVC env
3. Firewall rules allow internal traffic

### Issue: Image Pull Failures

**Symptoms:** ImagePullBackOff status

**Check:**
```python
mcp__cpln__list_images(org="...")
mcp__cpln__get_image(org="...", name="<image-name>")
```

## Prevention

1. **Set minimum resource limits** - Don't let Capacity AI reduce below safe thresholds
2. **Test environment variables** - Ensure all required env vars are present before deploying
3. **Monitor deployments** - Use MCP tools to check deployment health after releases
4. **Keep logs accessible** - Use `cpflow logs` to diagnose application errors

## MCP Tools Reference

| Tool | Purpose |
|------|---------|
| `set_context` | Set default org/GVC for session |
| `list_workloads` | List all workloads in a GVC |
| `get_workload` | Get workload configuration |
| `get_workload_deployments` | Get deployment status and health |
| `get_workload_events` | Get event log for debugging |
| `update_workload` | Update workload settings |
| `list_secrets` | List available secrets |
| `cpln_resource_operation` | Generic CRUD for any resource |

## Promotion Checklist: Staging to Production

**CRITICAL:** Before promoting staging to production, ensure both environments have matching configurations.

### Pre-Promotion Checklist

- [ ] **Environment Variables Match** - All required env vars in staging GVC must also exist in production GVC
- [ ] **Secrets Configured** - Any secrets referenced by workloads exist in production org
- [ ] **Resource Limits Set** - Production workloads have appropriate CPU/memory (not relying on Capacity AI)
- [ ] **Database Migrations Safe** - Release script migrations are backwards-compatible

### Common Promotion Failures

#### Missing Environment Variables in Production

**Incident (Feb 2026):** Staging was fixed by adding `SECRET_KEY_BASE` to the GVC. When promoted to production, the image worked but production GVC was missing `SECRET_KEY_BASE`, causing immediate crash.

**Prevention:**
1. When adding env vars to staging, **immediately add to production** (even before promotion)
2. Use a checklist or automation to sync GVC env vars between environments
3. Consider storing shared secrets in a central location referenced by both GVCs

**Recovery:**
```bash
# Generate production secret (use different value than staging!)
export PROD_SECRET_KEY=$(openssl rand -hex 64)

# Add to production GVC
cpln gvc patch react-webpack-rails-tutorial-production \
  --org shakacode-open-source-examples-production \
  --set "spec.env[+].name=SECRET_KEY_BASE" \
  --set "spec.env[-1].value=$PROD_SECRET_KEY"
```

### Recommended Workflow

1. **Fix staging** - Diagnose and fix the issue
2. **Document the fix** - Note any configuration changes made
3. **Apply to production FIRST** - Add any new env vars/secrets to production before promotion
4. **Then promote** - Run the promotion workflow
5. **Verify production** - Check deployment health after promotion

## Automatic Rollback

The promotion workflow includes automatic rollback protection. If a deployment fails health checks, it will automatically restore the previous working image.

### How It Works

```
1. Capture current production image → Save for potential rollback
2. Copy new image from staging     → Get the new version
3. Deploy to production            → Run release phase (migrations)
4. Health check (12 retries)       → Verify deployment is responding
5a. If healthy → Create GitHub release
5b. If unhealthy → Rollback to previous image
```

### Rollback Triggers

Automatic rollback occurs when:
- Health check fails after 12 attempts (2 minutes total)
- HTTP endpoint returns non-2xx/3xx status
- Deployment times out

### Manual Rollback

If you need to manually rollback:

```bash
# Get the previous image from GitHub Actions logs or:
cpln workload get rails \
  --gvc react-webpack-rails-tutorial-production \
  --org shakacode-open-source-examples-production \
  -o json | jq '.version'

# List available images
cpln image list --org shakacode-open-source-examples-production

# Rollback to specific image
cpln workload update rails \
  --gvc react-webpack-rails-tutorial-production \
  --org shakacode-open-source-examples-production \
  --set spec.containers[0].image="/org/shakacode-open-source-examples-production/image/react-webpack-rails-tutorial-production:<tag>"
```

### Via MCP Tools

```python
# Get current workload to see image history
mcp__cpln__get_workload(gvc="...", name="rails")

# Update to previous image
mcp__cpln__update_workload(
  gvc="react-webpack-rails-tutorial-production",
  name="rails",
  image="/org/.../image/react-webpack-rails-tutorial-production:<previous-tag>"
)
```

### Automation Suggestions

Consider adding a pre-promotion check to the GitHub Action:

```yaml
- name: Verify Production Environment
  run: |
    # Compare staging and production GVC env vars
    STAGING_VARS=$(cpln gvc get react-webpack-rails-tutorial-staging \
      --org shakacode-open-source-examples-staging -o json | jq -r '.spec.env[].name' | sort)
    PROD_VARS=$(cpln gvc get react-webpack-rails-tutorial-production \
      --org shakacode-open-source-examples-production -o json | jq -r '.spec.env[].name' | sort)

    MISSING=$(comm -23 <(echo "$STAGING_VARS") <(echo "$PROD_VARS"))
    if [ -n "$MISSING" ]; then
      echo "ERROR: Production is missing these env vars from staging:"
      echo "$MISSING"
      exit 1
    fi
```

## Setting Up MCP Access for Multiple Organizations

By default, the Control Plane MCP uses a service account that may only have access to one organization. To enable AI-assisted debugging across both staging and production, you need to grant cross-org permissions.

### Understanding MCP Authentication

The MCP authenticates using a service account token. For example:
```
Service Account: /org/shakacode-open-source-examples-staging/serviceaccount/claude
```

This service account has full access to staging but needs explicit permissions for production.

### Granting Cross-Org Access (Recommended)

Run these commands to grant the staging service account access to production:

```bash
# Step 1: Create a policy in the PRODUCTION org that grants access to the staging service account
cpln policy create mcp-claude-access \
  --org shakacode-open-source-examples-production \
  --description "Grants MCP claude service account access for AI-assisted debugging" \
  --target-kind gvc \
  --target-links "//gvc/react-webpack-rails-tutorial-production" \
  --bindings "/org/shakacode-open-source-examples-staging/serviceaccount/claude=edit"

# Step 2: Also grant access to workloads within the GVC
cpln policy create mcp-claude-workload-access \
  --org shakacode-open-source-examples-production \
  --description "Grants MCP claude service account workload access" \
  --target-kind workload \
  --target-all \
  --gvc react-webpack-rails-tutorial-production \
  --bindings "/org/shakacode-open-source-examples-staging/serviceaccount/claude=edit"

# Step 3: Grant access to view/manage secrets if needed
cpln policy create mcp-claude-secret-access \
  --org shakacode-open-source-examples-production \
  --description "Grants MCP claude service account secret access" \
  --target-kind secret \
  --target-all \
  --bindings "/org/shakacode-open-source-examples-staging/serviceaccount/claude=view"
```

### Alternative: Via Control Plane UI

1. Go to **shakacode-open-source-examples-production** org
2. Navigate to **Policies**
3. Create a new policy:
   - **Name:** `mcp-claude-access`
   - **Target Kind:** `gvc`
   - **Target:** `react-webpack-rails-tutorial-production`
   - **Bindings:** Add `/org/shakacode-open-source-examples-staging/serviceaccount/claude` with `edit` permission

### Verifying Access

After setting up permissions, test with MCP:

```python
# Set context to production
mcp__cpln__set_context(
  org="shakacode-open-source-examples-production",
  defaultGvc="react-webpack-rails-tutorial-production"
)

# Try to list workloads - should work now
mcp__cpln__list_workloads(gvc="react-webpack-rails-tutorial-production")
```

### Security Considerations

- **Least privilege:** Only grant the permissions needed (view vs edit vs manage)
- **Audit trail:** All MCP actions are logged in Control Plane audit logs
- **Separate tokens:** For stricter security, create separate service accounts per environment
- **Time-limited access:** Consider creating temporary policies for incident response

### Alternative: Multiple MCP Configurations

If you prefer separate credentials per environment, configure multiple MCP servers:

```json
{
  "mcpServers": {
    "cpln-staging": {
      "command": "controlplane-mcp",
      "env": {
        "CPLN_TOKEN": "<staging-service-account-token>",
        "CPLN_ORG": "shakacode-open-source-examples-staging"
      }
    },
    "cpln-production": {
      "command": "controlplane-mcp",
      "env": {
        "CPLN_TOKEN": "<production-service-account-token>",
        "CPLN_ORG": "shakacode-open-source-examples-production"
      }
    }
  }
}
```

This gives you separate tool prefixes: `mcp__cpln-staging__*` and `mcp__cpln-production__*`.

## Related Documentation

- [Control Plane MCP Guide](cpln+virtual://guide)
- [cpflow Documentation](https://github.com/shakacode/control-plane-flow)
- [Control Plane Official Docs](https://docs.controlplane.com)
