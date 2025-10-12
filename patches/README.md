# Patches

This directory contains patches applied to npm packages using [patch-package](https://github.com/ds300/patch-package).

## Why Patches?

Patches are used when npm packages need modifications that haven't been released upstream yet, or when quick fixes are needed for compatibility issues.

## Current Patches

### @glennsl/rescript-json-combinators+1.4.0.patch

**Issue**: This package ships with only ReScript source files (`.res`), not compiled JavaScript files (`.bs.js`). Its `bsconfig.json` lacks the `package-specs` configuration needed to generate compiled output.

**Impact**: Without this patch, Rspack/Webpack cannot resolve imports like:
```javascript
import * as Json from "@glennsl/rescript-json-combinators/src/Json.bs.js";
```

**What the patch does**:
1. Removes reference to non-existent `examples` directory
2. Adds `package-specs` configuration for ES module output
3. Adds `suffix: ".bs.js"` to generate `.bs.js` files

**When applied**: Automatically during `yarn install` via the `postinstall` script

**Upstream status**:
- Opened issue: https://github.com/glennsl/rescript-json-combinators/issues/9
- This is a common pattern for in-source builds with ReScript
- May not be accepted upstream if author prefers source-only distribution

**TODO**: Check if patch is still needed when upgrading `@glennsl/rescript-json-combinators`

## Verifying Patches

After running `yarn install`, verify the patch was applied correctly:

```bash
# Run ReScript build - should succeed without errors
yarn res:build

# Expected output: Compiled successfully
# If you see errors about missing .bs.js files, the patch wasn't applied
```

**Common issues**:
- **Patch not applied**: Check that `postinstall` script ran (look for patch-package output during install)
- **Build fails**: Run `yarn install --force` to reapply patches
- **Wrong ReScript version**: Ensure ReScript version matches the patched package expectations

## How Patches Work

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
