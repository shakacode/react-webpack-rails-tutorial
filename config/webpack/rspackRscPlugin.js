// Rspack-compatible RSC manifest plugin.
//
// The standard RSCWebpackPlugin from react-on-rails-rsc uses webpack internals
// (ModuleDependency, NullDependency, contextModuleFactory.resolveDependencies)
// that are not available in Rspack. This lightweight plugin generates the
// react-client-manifest.json and react-server-client-manifest.json files
// that the React flight protocol needs to resolve client component references.

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
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
          const filePathToModuleMetadata = {};
          const configuredCrossOriginLoading = this._getCrossOriginLoading(compilation);
          const manifest = {
            moduleLoading: {
              prefix: compilation.outputOptions.publicPath || '',
              crossOrigin: configuredCrossOriginLoading,
            },
            filePathToModuleMetadata,
          };

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
              this._processModule(mod, chunk, chunkFiles, filePathToModuleMetadata, compilation);
              // Handle concatenated modules
              if (mod.modules) {
                for (const innerMod of mod.modules) {
                  this._processModule(innerMod, chunk, chunkFiles, filePathToModuleMetadata, compilation);
                }
              }
            }
          }

          compilation.emitAsset(
            this.clientManifestFilename,
            new sources.RawSource(JSON.stringify(manifest, null, 2)),
          );
        },
      );
    });
  }

  _getCrossOriginLoading(compilation) {
    const configuredCrossOriginLoading = compilation.outputOptions.crossOriginLoading;

    if (typeof configuredCrossOriginLoading !== 'string') {
      return null;
    }

    return configuredCrossOriginLoading === 'use-credentials' ? configuredCrossOriginLoading : 'anonymous';
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
    } catch (err) {
      // ENOENT is expected for virtual/generated modules; anything else is a real problem.
      if (err.code !== 'ENOENT') {
        // eslint-disable-next-line no-console
        console.warn(`[RscPlugin] Failed to read ${filePath}:`, err.message);
      }
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

  _processModule(mod, chunk, chunkFiles, filePathToModuleMetadata, compilation) {
    const resource = mod.resource || mod.userRequest;
    if (!resource || !resource.match(/\.(js|jsx|ts|tsx)$/)) return;
    // Skip node_modules
    if (resource.includes('node_modules')) return;
    if (!this._shouldIncludeInManifest(resource)) return;

    // Check original file for 'use client' directive
    if (!this._hasUseClientDirective(resource)) return;

    const moduleId = compilation.chunkGraph ? compilation.chunkGraph.getModuleId(mod) : mod.id;

    if (moduleId == null) return;

    const chunks = [];
    for (const file of chunkFiles) {
      chunks.push(chunk.id, file);
    }

    const key = pathToFileURL(resource).href;
    const existingEntry = filePathToModuleMetadata[key];

    if (existingEntry) {
      const knownChunkIds = new Set();
      for (let index = 0; index < existingEntry.chunks.length; index += 2) {
        knownChunkIds.add(existingEntry.chunks[index]);
      }

      for (let index = 0; index < chunks.length; index += 2) {
        if (!knownChunkIds.has(chunks[index])) {
          existingEntry.chunks.push(chunks[index], chunks[index + 1]);
          knownChunkIds.add(chunks[index]);
        }
      }
      return;
    }

    filePathToModuleMetadata[key] = {
      id: moduleId,
      chunks: chunks,
      name: '*',
    };
  }

  _shouldIncludeInManifest(resource) {
    const normalizedResource = path.normalize(resource);
    const repoRoot = path.resolve(__dirname, '../../');
    const serverComponentsRoot = path.join(repoRoot, 'client/app/bundles/server-components/');
    const storesRegistrationPath = path.join(repoRoot, 'client/app/packs/stores-registration.js');

    // The RSC runtime only needs client references that can appear inside the
    // server-components demo tree. Pulling in unrelated app bundles causes the
    // client and server manifests to diverge and breaks buildClientRenderer().
    return (
      normalizedResource.startsWith(serverComponentsRoot) ||
      normalizedResource === storesRegistrationPath
    );
  }
}

module.exports = { RspackRscPlugin };
