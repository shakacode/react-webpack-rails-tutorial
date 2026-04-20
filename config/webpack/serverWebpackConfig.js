// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_tutorial_with_ssr_and_hmr_fast_refresh/blob/master/config/webpack/serverWebpackConfig.js

/* eslint-disable no-param-reassign */
const path = require('path');
const { config } = require('shakapacker');
const { RSCWebpackPlugin } = require('react-on-rails-rsc/WebpackPlugin');
const commonWebpackConfig = require('./commonWebpackConfig');
const { getBundler } = require('./bundlerUtils');

/**
 * Locates a loader in a rule's `use` array by loader name substring.
 *
 * Exposed on the module exports so rscWebpackConfig.js can call it when
 * deriving the RSC bundle from serverWebpackConfig(true). Matches the
 * `extractLoader` helper used in the Pro dummy and marketplace references.
 *
 * @param {Object} rule Webpack module rule with a `use` array
 * @param {string} loaderName Substring to match against each loader's name
 * @returns {Object|string|undefined} Matching loader entry, or undefined
 */
function extractLoader(rule, loaderName) {
  if (!Array.isArray(rule.use)) return undefined;
  return rule.use.find((item) => {
    const testValue = typeof item === 'string' ? item : item?.loader;
    return typeof testValue === 'string' && testValue.includes(loaderName);
  });
}

/**
 * Generates the server-side rendering (SSR) bundle configuration for Pro's
 * Node renderer.
 *
 * Key Pro-specific settings (applied after shakapacker's generated config):
 * - target: 'node' + node: false — required for Node execution in the renderer
 * - libraryTarget: 'commonjs2' — required so the renderer can `require()` the bundle
 * - RSCWebpackPlugin({ isServer: true }) — emits the server manifest used by
 *   React Server Components (inert until RSC support is enabled in Sub-PR 3)
 * - babelLoader caller = { ssr: true } — lets Babel pick SSR-specific transforms
 * - CSS extraction disabled; css-loader switches to exportOnlyLocals for class
 *   name mapping only
 *
 * The `rscBundle` arg exists so Sub-PR 3's rscWebpackConfig.js can derive the
 * RSC bundle from this same config — when true, the server-manifest plugin is
 * skipped (the RSC bundle emits the client manifest instead).
 *
 * @param {boolean} [rscBundle=false] True when called from rscWebpackConfig.js
 * @returns {Object} Webpack configuration object for the SSR bundle
 */
const configureServer = (rscBundle = false) => {
  const bundler = getBundler();

  // We need to use "merge" because the clientConfigObject, EVEN after running
  // toWebpackConfig() is a mutable GLOBAL. Thus any changes, like modifying the
  // entry value will result in changing the client config!
  // Using webpack-merge into an empty object avoids this issue.
  const serverWebpackConfig = commonWebpackConfig();

  // We just want the single server bundle entry
  const serverEntry = {
    'server-bundle': serverWebpackConfig.entry['server-bundle'],
  };

  if (!serverEntry['server-bundle']) {
    const sourcePath = config.source_path || 'client/app';
    const entryPath = config.source_entry_path || 'packs';
    const fullPath = `${sourcePath}/${entryPath}/server-bundle.js`;

    throw new Error(
      `Server bundle entry 'server-bundle' not found.\n` +
        `Expected file: ${fullPath}\n` +
        `Current source_path: ${config.source_path}\n` +
        `Current source_entry_path: ${config.source_entry_path}\n` +
        `Verify:\n` +
        `1. The server-bundle.js file exists at the expected location\n` +
        `2. nested_entries is configured correctly in shakapacker.yml\n` +
        `3. The file is properly exported from your entry point`,
    );
  }

  serverWebpackConfig.entry = serverEntry;

  // No splitting of chunks for a server bundle
  serverWebpackConfig.optimization = {
    minimize: false,
  };
  serverWebpackConfig.plugins.unshift(new bundler.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));

  if (!rscBundle) {
    serverWebpackConfig.plugins.push(new RSCWebpackPlugin({ isServer: true }));
  }

  // Custom output for the server-bundle.
  // libraryTarget: 'commonjs2' is required by the Pro Node renderer so it can
  // `require()` the evaluated bundle.
  serverWebpackConfig.output = {
    filename: 'server-bundle.js',
    globalObject: 'this',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../../ssr-generated'),
    publicPath: config.publicPath,
  };

  // Don't hash the server bundle b/c would conflict with the client manifest
  // And no need for CSS extraction plugins (webpack's MiniCssExtractPlugin or
  // rspack's CssExtractRspackPlugin).
  serverWebpackConfig.plugins = serverWebpackConfig.plugins.filter(
    (plugin) =>
      plugin.constructor.name !== 'WebpackAssetsManifest' &&
      plugin.constructor.name !== 'MiniCssExtractPlugin' &&
      plugin.constructor.name !== 'CssExtractRspackPlugin' &&
      plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin',
  );

  // Configure loader rules for SSR:
  // - strip CSS extraction and style-loader (client build handles CSS export)
  // - css-loader exportOnlyLocals: true (keep class name mapping only)
  // - babel-loader caller.ssr: true (Babel picks SSR-specific transforms)
  // - url/file-loader emitFile: false (don't duplicate image assets during SSR)
  serverWebpackConfig.module.rules.forEach((rule) => {
    if (Array.isArray(rule.use)) {
      rule.use = rule.use.filter((item) => {
        const testValue = typeof item === 'string' ? item : item?.loader;
        if (typeof testValue !== 'string') return true;
        return !(
          testValue.match(/mini-css-extract-plugin/) ||
          testValue.match(/CssExtractRspackPlugin/) ||
          testValue.includes('cssExtractLoader') ||
          testValue === 'style-loader'
        );
      });

      const cssLoader = extractLoader(rule, 'css-loader');
      if (cssLoader?.options?.modules) {
        cssLoader.options.modules = {
          ...cssLoader.options.modules,
          exportOnlyLocals: true,
        };
      }

      const babelLoader = extractLoader(rule, 'babel-loader');
      if (babelLoader) {
        babelLoader.options = babelLoader.options || {};
        babelLoader.options.caller = { ssr: true };
      }
    } else if (rule.use && (rule.use.loader === 'url-loader' || rule.use.loader === 'file-loader')) {
      rule.use.options.emitFile = false;
    }
  });

  // eval works well for the SSR bundle because it's the fastest and shows
  // lines in the server bundle which is good for debugging SSR.
  serverWebpackConfig.devtool = 'eval';

  // Target 'node' so the bundle uses real CommonJS require() and Node globals
  // like __dirname. Avoids polyfills and fixes libraries like Emotion and
  // loadable-components that break under target: 'web' in SSR.
  serverWebpackConfig.target = 'node';

  // Disable Node.js polyfill shims — not needed when targeting Node.
  serverWebpackConfig.node = false;

  return serverWebpackConfig;
};

module.exports = {
  default: configureServer,
  extractLoader,
};
