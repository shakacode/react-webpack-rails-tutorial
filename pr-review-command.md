# Claude PR Review Command

Add this to your ~/.claude/CLAUDE.md file:

## PR Review Command

When asked to review a PR, perform a comprehensive review following these steps:

1. **Fetch PR Details**: Use `gh pr view <PR_NUMBER> --json title,body,state,commits,files,additions,deletions,changedFiles`

2. **Analyze Changes**: 
   - Review the diff with `gh pr diff <PR_NUMBER>`
   - Check for breaking changes
   - Verify consistency with existing code patterns
   - Check for security issues
   - Review test coverage

3. **Provide Structured Review**:
   - **Summary**: Brief overview of changes
   - **Strengths**: What's done well
   - **Concerns**: Potential issues or risks
   - **Breaking Changes**: Any backwards compatibility issues
   - **Security**: Any security considerations
   - **Performance**: Performance implications
   - **Code Quality**: Style, patterns, best practices
   - **Testing**: Test coverage and quality
   - **Documentation**: Are changes documented?
   - **Suggestions**: Specific improvements
   - **Risk Level**: Low/Medium/High
   - **Recommendation**: Approve/Request Changes/Needs Discussion

4. **Check CI Status**: `gh pr checks <PR_NUMBER>`

5. **Review Comments**: Check existing review comments if any