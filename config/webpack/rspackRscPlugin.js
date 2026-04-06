// Rspack-compatible RSC manifest plugin.
//
// The standard RSCWebpackPlugin from react-on-rails-rsc uses webpack internals
// (ModuleDependency, NullDependency, contextModuleFactory.resolveDependencies)
// that are not available in Rspack. This lightweight plugin generates the
// react-client-manifest.json and react-server-client-manifest.json files
// that the React flight protocol needs to resolve client component references.

const fs = require('fs');
const { sources } = require('@rspack/core');

class RspackRscPlugin {
  constructor(options) {
    if (!options || typeof options.isServer !== 'boolean') {
      throw new Error('RspackRscPlugin: isServer option (boolean) is required.');
    }
    this.isServer = options.isServer;
    this.clientManifestFilename = options.isServer
      ? 'react-server-client-manifest.json'
      : 'react-client-manifest.json';
    this.ssrManifestFilename = 'react-ssr-manifest.json';
    this.useClientCache = new Map();
  }

  apply(compiler) {
    // Clear cache on each compilation so watch-mode picks up 'use client' changes
    compiler.hooks.thisCompilation.tap('RspackRscPlugin-ClearCache', () => {
      this.useClientCache.clear();
    });

    compiler.hooks.thisCompilation.tap('RspackRscPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'RspackRscPlugin',
          stage: compilation.constructor.PROCESS_ASSETS_STAGE_REPORT || 5000,
        },
        () => {
          const manifest = {};

          for (const chunk of compilation.chunks) {
            const chunkFiles = [];
            for (const file of chunk.files) {
              if (file.endsWith('.js') && !file.endsWith('.hot-update.js')) {
                chunkFiles.push(file);
                break;
              }
            }

            const modules = compilation.chunkGraph
              ? compilation.chunkGraph.getChunkModulesIterable(chunk)
              : [];

            for (const mod of modules) {
              this._processModule(mod, chunk, chunkFiles, manifest, compilation);
              // Handle concatenated modules
              if (mod.modules) {
                for (const innerMod of mod.modules) {
                  this._processModule(innerMod, chunk, chunkFiles, manifest, compilation);
                }
              }
            }
          }

          compilation.emitAsset(
            this.clientManifestFilename,
            new sources.RawSource(JSON.stringify(manifest, null, 2)),
          );

          // Emit SSR manifest (maps module IDs to SSR module data)
          if (!this.isServer) {
            compilation.emitAsset(
              this.ssrManifestFilename,
              new sources.RawSource(JSON.stringify({}, null, 2)),
            );
          }
        },
      );
    });
  }

  _hasUseClientDirective(filePath) {
    if (this.useClientCache.has(filePath)) return this.useClientCache.get(filePath);

    let result = false;
    let fd;
    try {
      // Read the first ~200 bytes — 'use client' must be at the very top of the file.
      fd = fs.openSync(filePath, 'r');
      const buf = Buffer.alloc(200);
      fs.readSync(fd, buf, 0, 200, 0);

      const head = buf.toString('utf-8');
      // Allow comments before the directive.
      result = /^(?:\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/))*\s*['"]use client['"]/.test(head);
    } catch (_) {
      // file doesn't exist or can't be read
    } finally {
      if (fd !== undefined) {
        try {
          fs.closeSync(fd);
        } catch (_) {
          // no-op
        }
      }
    }

    this.useClientCache.set(filePath, result);
    return result;
  }

  _processModule(mod, chunk, chunkFiles, manifest, compilation) {
    const resource = mod.resource || mod.userRequest;
    if (!resource || !resource.match(/\.(js|jsx|ts|tsx)$/)) return;
    // Skip node_modules
    if (resource.includes('node_modules')) return;

    // Check original file for 'use client' directive
    if (!this._hasUseClientDirective(resource)) return;

    const moduleId = compilation.chunkGraph ? compilation.chunkGraph.getModuleId(mod) : mod.id;

    if (moduleId == null) return;

    const chunks = [];
    for (const file of chunkFiles) {
      chunks.push(chunk.id, file);
    }

    // Build the module entry with all exported names
    const ssrEntry = {
      id: moduleId,
      chunks: chunks,
      name: '*',
      async: false,
    };

    // Use resource path as the key (React flight protocol convention)
    const key = resource;
    if (!manifest[key]) {
      manifest[key] = {};
    }
    manifest[key]['*'] = ssrEntry;
    manifest[key][''] = ssrEntry;

    // Also add default export entry
    manifest[key]['default'] = {
      ...ssrEntry,
      name: 'default',
    };
  }
}

module.exports = { RspackRscPlugin };
