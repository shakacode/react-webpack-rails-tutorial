# Shakapacker 9.0.0-beta.5 Missing Compiled JavaScript Files

## Issue Summary
Shakapacker 9.0.0-beta.5 npm package is published with TypeScript source files (.ts) but missing the compiled JavaScript files (.js), making the package unusable.

## Details

### What's happening:
When trying to use shakapacker 9.0.0-beta.5, webpack fails with:
```
Error: Cannot find module '/path/to/node_modules/shakapacker/package/index.js'
```

### Root Cause:
The npm package contains only TypeScript source files without the compiled JavaScript output.

### Investigation Results:

**Beta.4 package structure (working):**
```bash
$ ls -la node_modules/shakapacker/package/
-rw-r--r--  config.js      # ✅ JavaScript file exists
-rw-r--r--  dev_server.js  # ✅ JavaScript file exists  
-rw-r--r--  env.js         # ✅ JavaScript file exists
-rw-r--r--  index.js       # ✅ JavaScript file exists
-rw-r--r--  index.d.ts     # TypeScript definitions
```

**Beta.5 package structure (broken):**
```bash
$ ls -la node_modules/shakapacker/package/
-rw-r--r--  config.ts      # ❌ TypeScript source only
-rw-r--r--  dev_server.ts  # ❌ TypeScript source only
-rw-r--r--  env.ts         # ❌ TypeScript source only
-rw-r--r--  index.ts       # ❌ TypeScript source only
-rw-r--r--  index.d.ts     # TypeScript definitions
# Missing: index.js, config.js, dev_server.js, env.js
```

### Package.json has build script:
```json
{
  "scripts": {
    "build": "tsc",
    // ...
  }
}
```

But the tsconfig.json is not included in the published package, and the build output is missing.

## Likely Fix Needed

The build process needs to:
1. Run `npm run build` before publishing to compile TypeScript to JavaScript
2. Ensure the compiled .js files are included in the npm package
3. Update the package.json "files" field or .npmignore to include the compiled output

## Workaround

For now, users should use:
- **9.0.0-beta.4** which has the compiled JavaScript files
- Set `javascript_transpiler: babel` in shakapacker.yml (beta.4 defaults to SWC)

## Version Comparison

| Version | Status | Notes |
|---------|--------|-------|
| 8.2.0 | ✅ Working | Stable release |
| 8.4.0 | ✅ Working | Latest stable |
| 9.0.0-beta.4 | ✅ Working | Has compiled JS, defaults to SWC |
| 9.0.0-beta.5 | ❌ Broken | Missing compiled JS files |

## Configuration Change for Beta.4

When using beta.4, add to `config/shakapacker.yml`:
```yaml
default: &default
  javascript_transpiler: babel  # Beta versions default to SWC
```