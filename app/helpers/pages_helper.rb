module PagesHelper
  def git_commit_sha
    GitCommitSha.current_sha
  end

  def git_commit_sha_short
    full_sha = git_commit_sha
    full_sha[-7..-1]
  end
end
