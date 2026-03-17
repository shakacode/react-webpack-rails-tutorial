# TODO: Fix Turbo Warning in Future PR

## Issue
There's a console warning about Turbo being loaded from within the `<body>` element instead of the `<head>`.

## Root Cause
Conflicting requirements between three systems:
1. **Turbo** - Wants to be loaded in `<head>` to avoid re-evaluation on page changes
2. **Shakapacker** - Requires all `append_javascript_pack_tag` calls to happen before the final `javascript_pack_tag`
3. **React on Rails** - The `react_component` helper internally calls `append_javascript_pack_tag` when rendering components in the body

## Attempted Solutions That Failed
1. Moving `javascript_pack_tag` to head - Breaks because `react_component` calls come after it
2. Using `data-turbo-suppress-warning` - Doesn't properly suppress the warning

## Potential Future Solutions
1. Extract Turbo into a separate pack from stimulus-bundle and load it in the head
2. Use `prepend_javascript_pack_tag` instead of `append` for component registration
3. Configure React on Rails v16 to use a different component loading strategy
4. Investigate if the auto-registration feature has a different recommended pack loading pattern

## Current State
The application works correctly with the pack tags at the end of the body. The Turbo warning is cosmetic and doesn't affect functionality.

## References
- PR #649: Initial v16 migration
- Shakapacker docs: https://github.com/shakacode/shakapacker#view-helper-append_javascript_pack_tag
- Turbo docs: https://turbo.hotwired.dev/handbook/building#working-with-script-elements
- React on Rails v16 docs: https://www.shakacode.com/react-on-rails/docs/