# Retrieves the current git commit SHA of the project
class GitCommitSha
  def self.current_sha
    @commit_sha ||= retrieve_sha_from_file.presence || retrieve_sha_from_git
  end

  def self.current_sha=(sha)
    @commit_sha = sha
  end

  def self.reset_current_sha
    self.current_sha = nil
  end

  def self.retrieve_sha_from_git
    `git rev-parse HEAD 2>/dev/null`.to_s.strip
  end

  def self.retrieve_sha_from_file
    expected_filepath = Rails.root.join(".source_version")
    File.exist?(expected_filepath) ? File.read(expected_filepath) : nil
  end
end
