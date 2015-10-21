module PagesHelper
  def git_commit_sha
    GitCommitSha.current_sha
  end

  def git_commit_sha_short
    full_sha = git_commit_sha
    full_sha.slice(full_sha.size - 7, full_sha.size)
  end
end
