# frozen_string_literal: true

require "yaml"
require "open3"
require "rbconfig"
require "tmpdir"
require "fileutils"

load File.expand_path("../bin/check-cpflow-review-app-contract", __dir__)

RSpec.describe "Workflow release and security contracts" do
  let(:root) { File.expand_path("..", __dir__) }
  let(:release_sha) { "6aa575780f2d9175755881b79cbb3253adbc9c1f" }

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
    expect(output).to include("review-app release contract: v6.0.1")
  end

  it "activates an isolated bundle when plain Ruby has no inherited bundle-exec setup" do
    Dir.mktmpdir("cpflow-isolated-bundle") do |directory|
      bundle_path = File.join(directory, "bundle")
      ruby_gems = File.join(bundle_path, "ruby", RbConfig::CONFIG.fetch("ruby_version"))
      FileUtils.mkdir_p(File.dirname(ruby_gems))
      File.symlink(Bundler.bundle_path, ruby_gems)
      # Reuse installed gems offline, but keep them outside RubyGems' search path.
      env = {
        "PATH" => "",
        "GEM_HOME" => File.join(directory, "empty-gems"),
        "GEM_PATH" => File.join(directory, "empty-gems"),
        "BUNDLE_GEMFILE" => File.join(root, "Gemfile"),
        "BUNDLE_PATH" => bundle_path,
        "BUNDLE_IGNORE_CONFIG" => "1",
        "RUBYLIB" => File.join(Gem::Specification.find_by_name("bundler").full_gem_path, "lib")
      }
      output, status = Open3.capture2e(env, RbConfig.ruby,
                                       File.join(root, "bin/check-cpflow-review-app-contract"),
                                       unsetenv_others: true)

      expect(status.success?).to be(true), output
      expect(output).to include("review-app release contract: v6.0.1")
    end
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

    it "accepts the unchanged callers" do
      expect(CpflowReviewAppContract.check(fixture)).to be_empty
    end

    it "rejects a missing authenticated redispatch input" do
      change_fixture("deploy", "      reconcile_intent_run_id:", "      unrelated_input:")

      expect(CpflowReviewAppContract.check(fixture)).to include(a_string_including("dispatch inputs"))
    end

    [
      ["a moving ref", "deploy", "6aa575780f2d9175755881b79cbb3253adbc9c1f", "main", "released workflow ref"],
      ["a mismatched pair", "delete", "6aa575780f2d9175755881b79cbb3253adbc9c1f", "a" * 40, "released workflow ref"],
      ["a stale release comment", "delete", "# v6.0.1", "# v5.2.0", "release comment"],
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
      File.write(path, File.read(path).sub('gem "cpflow", "6.0.1"', 'gem "cpflow", "5.2.0"'))

      expect(CpflowReviewAppContract.check(fixture)).to include(a_string_including("Gemfile"))
    end

    it "rejects an out-of-date lockfile resolution" do
      path = File.join(fixture, "Gemfile.lock")
      File.write(path, File.read(path).sub("    cpflow (6.0.1)", "    cpflow (5.2.0)"))

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
  end
end
