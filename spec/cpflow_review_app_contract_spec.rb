# frozen_string_literal: true

require "yaml"
require "open3"
require "rbconfig"
require "tmpdir"
require "fileutils"

load File.expand_path("../bin/check-cpflow-review-app-contract", __dir__)

RSpec.describe "Released cpflow review-app callers" do
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
end
