# Developing and Testing Github Actions

Testing Github Actions on an existing repository is tricky.
                                                                               
The main issue boils down to the fact that Github Actions uses the workflow files in the branch where the event originates. This is fine for push events, but it becomes a problem when you want to test workflows that are triggered by comments on a pull request.

Here's a summary of the behavior:
  
Behavior of push and pull_request Events
	1.	Push on a Branch:
	•	When you push changes to a branch (e.g., feature-branch), GitHub Actions uses the workflow files in that same branch.
	•	This is why changes to workflows work seamlessly when testing with push events.
	2.	Pull Request Events:
	•	For pull_request events (e.g., a PR from feature-branch into master), GitHub Actions will always use the workflow files from the target branch (e.g., master), not the source branch (e.g., feature-branch).
	•	This is a security feature to prevent someone from introducing malicious code in a PR that modifies the workflow files themselves.

Impact on Comment-Triggered Workflows

When you want to trigger workflows via comments (issue_comment) in a pull request:
	•	The workflow code used will always come from the master branch (or the default branch), regardless of the branch where the PR originates.
	•	This means the PR’s changes to the workflow won’t be used, and the action invoked by the comment will also use code from master.

Workarounds to Test Comment-Triggered Workflows

If you want to test workflows in a way that uses the changes in the pull request, here are your options:

1. Use Push Events for Testing
	•	Test your changes on a branch with push triggers.
	•	Use workflow_dispatch to simulate the events you need (like invoking actions via comments).

This allows you to confirm that your changes to the workflow file or actions behave as expected before merging into master.

2. Merge the Workflow to master Temporarily

If you absolutely need the workflow to run as part of a pull_request event:
	1.	Merge your workflow changes into master temporarily.
	2.	Open a PR to test your comment-triggered workflows.
	3.	Revert the changes in master if necessary.

This ensures the workflow changes are active in master while still testing with the pull_request context.

3. Add Logic to Detect the Source Branch

Use github.event.pull_request.head.ref to add custom logic in your workflow that behaves differently based on the source branch.
	•	Example:

jobs:
  test-pr:
    runs-on: ubuntu-latest
    if: ${{ github.event.pull_request.head.ref == 'feature-branch' }}
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Debug
        run: echo "Testing workflow changes in feature-branch"

However, this still requires the workflow itself to exist in master.

4. Use a Fork or a Temporary Repo

Create a temporary repository or a fork to test workflows in isolation:
	•	Push your workflow changes to master in the test repository.
	•	Open a PR in the fork to test how workflows behave with issue_comment events and PR contexts.

Once confirmed, you can replicate the changes in your main repository.

6. Alternative Approach: Split Workflows

If your workflow includes comment-based triggers (issue_comment), consider splitting your workflows:
	•	A base workflow in master that handles triggering.
	•	A test-specific workflow for validating changes on a branch.

For example:
	1.	The base workflow triggers when a comment like /run-tests is added.
	2.	The test-specific workflow runs in response to the base workflow but uses the branch’s code.

Summary
	•	For push events: The branch-specific workflow is used, so testing changes is easy.
	•	For pull_request and issue_comment events: GitHub always uses workflows from the master branch, and there’s no direct way to bypass this.

To test comment-triggered workflows:
	1.	Use push or workflow_dispatch to validate changes.
	2.	Merge workflow changes temporarily into master to test with pull_request events.
	3.	Use tools like act for local simulation.
