# frozen_string_literal: true

require "yaml"
require "open3"
require "rbconfig"
require "tmpdir"
require "fileutils"

load File.expand_path("../bin/check-cpflow-review-app-contract", __dir__)

RSpec.describe "Workflow release and security contracts" do
  let(:root) { File.expand_path("..", __dir__) }
  let(:release_sha) { "b1e5ff4a04adfccfd8b59996e8abdbb5defb3fd6" }

  it "moves deploy and delete together to the released source" do
    %w[deploy delete].each do |operation|
      path = File.join(root, ".github/workflows/cpflow-#{operation}-review-app.yml")
      workflow = YAML.safe_load(File.read(path))
      job = operation == "deploy" ? "deploy" : "delete-review-app"

      expect(workflow.fetch("jobs").fetch(job).fetch("uses")).to end_with("@#{release_sha}")
    end
  end

  it "validates the release from Ruby alone without external tools" do
    output, status = Open3.capture2e({ "PATH" => "" }, RbConfig.ruby,
                                     File.join(root, "bin/check-cpflow-review-app-contract"))

    expect(status.success?).to be(true), output
    expect(output).to include("review-app release contract: v5.3.0")
  end

  context "with a copied caller fixture" do
    let(:fixture) { Dir.mktmpdir("cpflow-review-contract") }

    around do |example|
      FileUtils.mkdir_p(File.join(fixture, ".github/workflows"))
      %w[deploy delete].each do |operation|
        path = ".github/workflows/cpflow-#{operation}-review-app.yml"
        FileUtils.cp(File.join(root, path), File.join(fixture, path))
      end
      %w[Gemfile Gemfile.lock].each { |path| FileUtils.cp(File.join(root, path), fixture) }
      example.run
    ensure
      FileUtils.remove_entry_secure(fixture)
    end

    it "rejects a missing authenticated redispatch input" do
      change_fixture("deploy", "      reconcile_intent_run_id:", "      unrelated_input:")

      expect(CpflowReviewAppContract.check(fixture)).to include(a_string_including("dispatch inputs"))
    end

    [
      ["a moving ref", "deploy", "b1e5ff4a04adfccfd8b59996e8abdbb5defb3fd6", "main", "released workflow ref"],
      ["a mismatched pair", "delete", "b1e5ff4a04adfccfd8b59996e8abdbb5defb3fd6", "a" * 40, "released workflow ref"],
      ["a stale release comment", "delete", "# v5.3.0", "# v5.2.0", "release comment"],
      ["missing dispatch permission", "deploy", "  actions: write\n", "", "permissions"],
      ["missing deletion permission", "delete", "  deployments: write\n", "", "permissions"],
      ["excessive permissions", "deploy", "  contents: read", "  contents: write", "permissions"],
      ["an incorrect run name", "delete", "Delete Review App - PR #", "Delete - PR #", "run-name"],
      ["an incorrect job name", "delete", "  delete-review-app:", "  renamed:", "job contract"],
      ["extra push admission", "deploy", "on:\n", "on:\n  push:\n", "event admission"],
      ["PR edited admission", "deploy", "[opened, synchronize, reopened]", "[opened, synchronize, reopened, edited]",
       "event admission"],
      ["a weakened source guard", "deploy", "head.repo.full_name == github.repository",
       "head.repo.full_name != github.repository", "job guard"],
      ["a broadened command guard", "delete", '"OWNER","MEMBER","COLLABORATOR"',
       '"OWNER","MEMBER","COLLABORATOR","NONE"', "job guard"]
    ].each do |description, operation, before, after, message|
      it "rejects #{description}" do
        change_fixture(operation, before, after)

        expect(CpflowReviewAppContract.check(fixture)).to include(a_string_including(message))
      end
    end

    it "rejects an out-of-date local CLI dependency" do
      path = File.join(fixture, "Gemfile")
      File.write(path, File.read(path).sub('gem "cpflow", "5.3.0"', 'gem "cpflow", "5.2.0"'))

      expect(CpflowReviewAppContract.check(fixture)).to include(a_string_including("Gemfile"))
    end

    it "rejects an out-of-date lockfile resolution" do
      path = File.join(fixture, "Gemfile.lock")
      File.write(path, File.read(path).sub("    cpflow (5.3.0)", "    cpflow (5.2.0)"))

      expect(CpflowReviewAppContract.check(fixture)).to include(a_string_including("Gemfile.lock"))
    end

    def change_fixture(operation, before, after)
      path = File.join(fixture, ".github/workflows/cpflow-#{operation}-review-app.yml")
      source = File.read(path)
      raise "Fixture substitution did not match" unless source.include?(before)

      File.write(path, source.sub(before, after))
    end
  end

  context "with pinned workflow security boundaries" do
    let(:stable_sha) { "1d1ec7f7af181c5c6cf07f512ce336dbdb367246" }
    let(:upstream) { "shakacode/control-plane-flow" }

    def workflow(name)
      YAML.safe_load(File.read(File.join(root, ".github/workflows/#{name}.yml")))
    end

    it "keeps the older reusable workflow cohort on immutable v5.2.0" do
      %w[cleanup-stale-review-apps deploy-staging help-command review-app-help].each do |name|
        jobs = workflow("cpflow-#{name}").fetch("jobs")

        expect(jobs.values.map { |job| job.fetch("uses") }).to eq(
          ["#{upstream}/.github/workflows/cpflow-#{name}.yml@#{stable_sha}"]
        )
      end
    end

    it "keeps promotion actions and their source checkout on the same immutable release" do
      job = workflow("cpflow-promote-staging-to-production").fetch("jobs").fetch("promote-to-production")
      steps = job.fetch("steps")
      actions = steps.filter_map { |step| step["uses"] if step["uses"].to_s.include?("/cpflow-") }
      names = %w[cpflow-validate-config cpflow-setup-environment cpflow-detect-release-phase cpflow-wait-for-health]

      expect(job.fetch("environment")).to eq("production")
      expect(actions).to eq(names.map { |name| "#{upstream}/.github/actions/#{name}@#{stable_sha}" })
      checkout = steps.find { |step| step.fetch("with", {})["repository"] == upstream }
      expect(checkout.fetch("with")).to include("ref" => stable_sha, "path" => ".cpflow")
      setup = steps.find { |step| step["uses"].to_s.include?("/cpflow-setup-environment@") }
      setup_ref = "#{upstream}/.github/workflows/cpflow-promote-staging-to-production.yml@#{stable_sha}"
      expect(setup.fetch("with")).to include(
        "working_directory" => ".cpflow",
        "control_plane_flow_ref" => setup_ref
      )
    end

    it "keeps fork test jobs read-only" do
      %w[js_test lint_test rspec_test].each do |name|
        doc = workflow(name)

        expect(doc.fetch("permissions")).to eq("contents" => "read")
        expect(doc.fetch("jobs").values).to all(satisfy { |job| !job.key?("permissions") })
      end
    end

    it "scopes matching checkout metadata to the archive-packaging step only" do
      doc = workflow("cpflow-promote-staging-to-production")
      jobs = doc.fetch("jobs").values
      steps = jobs.flat_map { |job| job.fetch("steps", []) }
      setup = steps.find { |step| step["uses"].to_s.include?("/cpflow-setup-environment@") }

      expect(setup.fetch("env")).to eq("GIT_DIR" => "${{ github.workspace }}/.cpflow/.git")
      expect(doc.fetch("env", {})).not_to have_key("GIT_DIR")
      expect(jobs).to all(satisfy { |job| !job.fetch("env", {}).key?("GIT_DIR") })
      expect(steps.reject { |step| step.equal?(setup) })
        .to all(satisfy { |step| !step.fetch("env", {}).key?("GIT_DIR") })
    end

    it "does not persist checkout credentials in no-push jobs" do
      %w[js_test lint_test rspec_test claude claude-code-review cpflow-promote-staging-to-production].each do |name|
        steps = workflow(name).fetch("jobs").values.flat_map { |job| job.fetch("steps", []) }
        checkouts = steps.select { |step| step["uses"].to_s.start_with?("actions/checkout@") }

        expect(checkouts).not_to be_empty
        expect(checkouts).to all(satisfy { |step| step.fetch("with").fetch("persist-credentials") == false })
      end
    end

    it "admits only same-repository PRs to the credentialed review job" do
      job = workflow("claude-code-review").fetch("jobs").fetch("claude-review")

      expect(job.fetch("if")).to eq("github.event.pull_request.head.repo.full_name == github.repository")
    end

    context "with isolated composite action command stubs" do
      let(:fixture) { Dir.mktmpdir("workflow-shell-inputs") }
      let(:setup_steps) do
        YAML.safe_load(File.read(File.join(root, ".github/actions/cpflow-setup-environment/action.yml")))
            .fetch("runs").fetch("steps")
      end
      let(:hostile_input) { 'value with spaces; $(printf injected > "$FIXTURE_ROOT/injected") " end' }

      around do |example|
        %w[sudo npm gem cpln cpflow].each do |command|
          path = File.join(fixture, command)
          script = <<~'SHELL'
            #!/bin/bash
            set -eu
            printf '%s\0' "$@" >> "$FIXTURE_ROOT/COMMAND_NAME.args"
            if [[ "COMMAND_NAME" == sudo ]]; then
              exec "$@"
            fi
          SHELL
          File.write(path, script.gsub("COMMAND_NAME", command))
          FileUtils.chmod(0o700, path)
        end
        example.run
      ensure
        FileUtils.remove_entry_secure(fixture)
      end

      def run_step(step, inputs = {})
        bindings = step.fetch("env", {}).transform_values do |expression|
          match = /\A\$\{\{ inputs\.([a-z_]+) \}\}\z/.match(expression)
          raise "Unexpected test input binding" unless match

          inputs.fetch(match[1])
        end
        env = { "PATH" => fixture, "FIXTURE_ROOT" => fixture }.merge(bindings)
        _output, status = Open3.capture2e(env, "/bin/bash", "-c", step.fetch("run"),
                                          chdir: fixture, unsetenv_others: true)
        expect(File).not_to exist(File.join(fixture, "injected"))
        status
      end

      def arguments_for(command)
        File.binread(File.join(fixture, "#{command}.args")).split("\0")
      end

      it "passes version inputs as literal single arguments without shell evaluation" do
        step = setup_steps.fetch(1)

        status = run_step(step, "cpln_cli_version" => hostile_input, "cpflow_version" => hostile_input)

        expect(status.success?).to be(true)
        expect(arguments_for("npm")).to eq(["install", "-g", "@controlplane/cli@#{hostile_input}"])
        expect(arguments_for("gem")).to eq(["install", "cpflow", "-v", hostile_input])
        expect(arguments_for("cpln")).to eq(["--version"])
        expect(arguments_for("cpflow")).to eq(["--version"])
      end

      it "passes profile inputs literally without shell evaluation" do
        expect(run_step(setup_steps.fetch(2), "token" => hostile_input, "org" => hostile_input).success?).to be(true)
        expected_arguments = [
          "profile", "create", "default", "--token", hostile_input, "--org", hostile_input,
          "profile", "update", "default", "--org", hostile_input, "--token", hostile_input,
          "image", "docker-login", "--org", hostile_input
        ]
        expect(arguments_for("cpln")).to eq(expected_arguments)
      end

      %w[token org].each do |missing_input|
        it "rejects an empty #{missing_input} input before invoking a command" do
          inputs = { "token" => "fixture-value", "org" => "fixture-value", missing_input => "" }

          expect(run_step(setup_steps.fetch(2), inputs).success?).to be(false)
          expect(Dir[File.join(fixture, "*.args")]).to be_empty
        end
      end

      it "quotes the action path before executing the delete script" do
        action = YAML.safe_load(File.read(File.join(root,
                                                    ".github/actions/cpflow-delete-control-plane-app/action.yml")))
        step = action.fetch("runs").fetch("steps").fetch(0)
        action_path = File.join(fixture, "action $(printf injected)")
        FileUtils.mkdir_p(action_path)
        script = File.join(action_path, "delete-app.sh")
        File.write(script, "#!/bin/bash\nprintf called > \"$FIXTURE_ROOT/called\"\n")
        FileUtils.chmod(0o700, script)

        expect(step.fetch("env").fetch("ACTION_PATH")).to eq("${{ github.action_path }}")
        env = { "PATH" => fixture, "FIXTURE_ROOT" => fixture, "ACTION_PATH" => action_path }
        _output, status = Open3.capture2e(env, "/bin/bash", "-c", step.fetch("run"),
                                          chdir: fixture, unsetenv_others: true)

        expect(status.success?).to be(true)
        expect(File.read(File.join(fixture, "called"))).to eq("called")
        expect(File).not_to exist(File.join(fixture, "injected"))
      end
    end
  end
end
