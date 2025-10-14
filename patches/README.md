# Patches

This directory contains patches applied to npm packages using [patch-package](https://github.com/ds300/patch-package).

## Current Status

**No patches currently needed!** 🎉

This project previously required a patch for `@glennsl/rescript-json-combinators`, but we've migrated to the modern ReScript suffix convention (`.res.js` instead of `.bs.js`), which eliminates the need for patching.

## Historical Context

### Removed: @glennsl/rescript-json-combinators patch

**Previous Issue**: The project used `.bs.js` suffix (older ReScript convention) while the package used `.res.js` (modern default). We were patching the package to match our old convention.

**Solution**: Updated `bsconfig.json` to use `"suffix": ".res.js"` (modern ReScript standard). This aligns with:
- ReScript v11+ recommendations (`.bs` being phased out)
- All modern ReScript packages
- Future ReScript compatibility

**Why this is better**:
- ✅ No patch maintenance burden
- ✅ Follows modern ReScript conventions
- ✅ Compatible with future ReScript versions
- ✅ Works with ReScript packages out of the box

## How Patches Work (If Needed in Future)

1. **Creation**: When you modify a package in `node_modules/`, run:
   ```bash
   npx patch-package package-name
   ```

2. **Application**: Patches are automatically applied after `yarn install` via the `postinstall` script in `package.json`

3. **Updating**: If the package is updated and the patch fails, you'll need to either:
   - Regenerate the patch with the new version
   - Remove the patch if it's no longer needed
   - Update the patch manually

## Maintenance

- **Before upgrading patched packages**: Check if the patch is still necessary
- **If patch fails to apply**: The build will fail with a clear error message
- **Review patches regularly**: Consider contributing fixes upstream to reduce maintenance burden
