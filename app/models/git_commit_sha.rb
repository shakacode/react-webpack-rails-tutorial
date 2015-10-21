class GitCommitSha
  def self.current_sha
    @commit_sha ||= retrieve_sha_from_env_var.presence || retrieve_sha_from_git_folder
  end

  def self.current_sha=(sha)
    @commit_sha = sha
  end

  def self.reset_current_sha
    self.current_sha = nil
  end

  def self.retrieve_sha_from_git_folder
    `git rev-parse HEAD 2>/dev/null`.to_s.strip
  end

  def self.retrieve_sha_from_env_var
    env_var = ENV["DEPLOYMENT_SHA"]
    env_var.blank? ? nil : env_var
  end
end
