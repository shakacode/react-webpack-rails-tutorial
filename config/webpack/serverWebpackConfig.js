// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_tutorial_with_ssr_and_hmr_fast_refresh/blob/master/config/webpack/serverWebpackConfig.js

const path = require('path');
const { config } = require('shakapacker');
const commonWebpackConfig = require('./commonWebpackConfig');
const { getBundler } = require('./bundlerUtils');

/**
 * Extract a specific loader from a webpack rule's use array.
 *
 * @param {Object} rule - Webpack rule with a use array
 * @param {string} loaderName - Substring to match against loader names
 * @returns {Object|null} The matching loader entry, or null
 */
function extractLoader(rule, loaderName) {
  if (!Array.isArray(rule.use)) return null;
  return rule.use.find((item) => {
    const testValue = typeof item === 'string' ? item : item?.loader;
    return testValue && testValue.includes(loaderName);
  });
}

/**
 * Generates the server-side rendering (SSR) bundle configuration.
 *
 * This creates a separate bundle optimized for server-side rendering:
 * - Single chunk (no code splitting for Node.js execution)
 * - CSS extraction disabled (uses exportOnlyLocals for class name mapping)
 * - No asset hashing (not served directly to clients)
 * - Outputs to ssr-generated/ directory
 *
 * Key differences from client config:
 * - Removes CSS extraction loaders (mini-css-extract-plugin/CssExtractRspackPlugin)
 * - Preserves CSS Modules configuration but adds exportOnlyLocals: true
 * - Disables optimization/minification for faster builds and better debugging
 *
 * @returns {Object} Webpack/Rspack configuration object for server bundle
 */
const configureServer = () => {
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

  // Remove the mini-css-extract-plugin from the style loaders because
  // the client build will handle exporting CSS.
  // replace file-loader with null-loader
  serverWebpackConfig.module.rules.forEach((loader) => {
    if (loader.use && loader.use.filter) {
      loader.use = loader.use.filter(
        (item) => !(typeof item === 'string' && item.match(/mini-css-extract-plugin/)),
      );
    }
  });

  // No splitting of chunks for a server bundle
  serverWebpackConfig.optimization = {
    minimize: false,
  };
  serverWebpackConfig.plugins.unshift(new bundler.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));

  // Custom output for the server-bundle that matches the config in
  // config/initializers/react_on_rails.rb
  // Output to a private directory for SSR bundles (not in public/)
  // Using the default React on Rails path: ssr-generated
  serverWebpackConfig.output = {
    filename: 'server-bundle.js',
    globalObject: 'this',
    // libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../../ssr-generated'),
    publicPath: config.publicPath,
    // https://webpack.js.org/configuration/output/#outputglobalobject
  };

  // Don't hash the server bundle b/c would conflict with the client manifest
  // And no need for CSS extraction plugins (MiniCssExtractPlugin or CssExtractRspackPlugin)
  serverWebpackConfig.plugins = serverWebpackConfig.plugins.filter(
    (plugin) =>
      plugin.constructor.name !== 'WebpackAssetsManifest' &&
      plugin.constructor.name !== 'MiniCssExtractPlugin' &&
      plugin.constructor.name !== 'CssExtractRspackPlugin' &&
      plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin',
  );

  // Configure loader rules for SSR
  // Remove the mini-css-extract-plugin/CssExtractRspackPlugin from the style loaders because
  // the client build will handle exporting CSS.
  // replace file-loader with null-loader
  const rules = serverWebpackConfig.module.rules;
  rules.forEach((rule) => {
    if (Array.isArray(rule.use)) {
      // remove the mini-css-extract-plugin/CssExtractRspackPlugin and style-loader
      rule.use = rule.use.filter((item) => {
        let testValue;
        if (typeof item === 'string') {
          testValue = item;
        } else if (typeof item.loader === 'string') {
          testValue = item.loader;
        }
        return !(
          testValue?.match(/mini-css-extract-plugin/) ||
          testValue?.match(/CssExtractRspackPlugin/) ||
          testValue?.includes('cssExtractLoader') ||
          testValue === 'style-loader'
        );
      });
      const cssLoader = rule.use.find((item) => {
        let testValue;

        if (typeof item === 'string') {
          testValue = item;
        } else if (typeof item.loader === 'string') {
          testValue = item.loader;
        }

        return testValue?.includes('css-loader');
      });
      if (cssLoader && cssLoader.options && cssLoader.options.modules) {
        // Preserve existing modules config but add exportOnlyLocals for SSR
        cssLoader.options.modules = {
          ...cssLoader.options.modules,
          exportOnlyLocals: true,
        };
      }

      // Skip writing image files during SSR by setting emitFile to false
    } else if (rule.use && (rule.use.loader === 'url-loader' || rule.use.loader === 'file-loader')) {
      rule.use.options.emitFile = false;
    }
  });

  // eval works well for the SSR bundle because it's the fastest and shows
  // lines in the server bundle which is good for debugging SSR
  // The default of cheap-module-source-map is slow and provides poor info.
  serverWebpackConfig.devtool = 'eval';

  // Alias react-dom/server to the Node.js version for the Pro Node renderer.
  // The default browser version uses MessageChannel which isn't available in the Node VM.
  serverWebpackConfig.resolve = serverWebpackConfig.resolve || {};
  serverWebpackConfig.resolve.alias = {
    ...serverWebpackConfig.resolve.alias,
    'react-dom/server.browser$': 'react-dom/server.node',
    'react-dom/server.browser.js$': 'react-dom/server.node.js',
  };

  // react-on-rails-pro includes RSC-related modules that import Node.js builtins
  // (path, fs, stream). Externalize them so they resolve at runtime via require()
  // in the Node.js environment where the SSR bundle executes.
  const existingExternals = serverWebpackConfig.externals || {};
  serverWebpackConfig.externals = {
    ...(typeof existingExternals === 'object' && !Array.isArray(existingExternals) ? existingExternals : {}),
    path: 'commonjs path',
    fs: 'commonjs fs',
    'fs/promises': 'commonjs fs/promises',
    stream: 'commonjs stream',
  };

  return serverWebpackConfig;
};

module.exports = { default: configureServer, extractLoader };
