# Retrieves the current git commit SHA of the project
class GitCommitSha
  def self.current_sha
    @sha ||= retrieve_sha_from_file.presence || retrieve_sha_from_git
  end

  def self.current_sha=(sha)
    @sha = sha
  end

  def self.reset_current_sha
    self.current_sha = nil
  end

  # Assumes the git CLI is available. This is not the case in production on Heroku.
  def self.retrieve_sha_from_git
    `git rev-parse HEAD 2>/dev/null`.to_s.strip
  end

  # Assumes a .source_version file with SHA inside. A special Heroku buildpack creates this for us in production.
  def self.retrieve_sha_from_file
    expected_filepath = Rails.root.join(".source_version")
    File.exist?(expected_filepath) ? File.read(expected_filepath).to_s.strip : nil
  end
end
