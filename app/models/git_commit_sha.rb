class GitCommitSha
  def self.current_sha
    return @commit_sha unless @commit_sha.blank?
    @commit_sha = (retrieve_sha_from_env_var || retrieve_sha_from_git_folder)
  end

  def self.current_sha=(sha)
    @commit_sha = sha
  end

  def self.reset_current_sha
    self.current_sha = ""
  end

  def self.retrieve_sha_from_git_folder
    `git rev-parse HEAD 2>/dev/null`.to_s.strip
  end

  def self.retrieve_sha_from_env_var
    env_var = ENV["DEPLOYMENT_SHA"]
    env_var.blank? ? false : env_var
  end
end
