// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_tutorial_with_ssr_and_hmr_fast_refresh/blob/master/config/webpack/serverWebpackConfig.js

/* eslint-disable no-param-reassign */
const path = require('path');
const { config } = require('shakapacker');
const { RSCWebpackPlugin } = require('react-on-rails-rsc/WebpackPlugin');
const commonWebpackConfig = require('./commonWebpackConfig');
const { getBundler } = require('./bundlerUtils');

function extractLoader(rule, loaderName) {
  if (!Array.isArray(rule.use)) return undefined;
  return rule.use.find((item) => {
    const testValue = typeof item === 'string' ? item : item?.loader;
    return typeof testValue === 'string' && testValue.includes(loaderName);
  });
}

const configureServer = (rscBundle = false) => {
  const bundler = getBundler();

  // We need to use "merge" because the clientConfigObject, EVEN after running
  // toWebpackConfig() is a mutable GLOBAL. Thus any changes, like modifying the
  // entry value will result in changing the client config!
  // Using webpack-merge into an empty object avoids this issue.
  const serverWebpackConfig = commonWebpackConfig();

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

  serverWebpackConfig.optimization = {
    minimize: false,
  };
  serverWebpackConfig.plugins.unshift(new bundler.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));

  if (!rscBundle) {
    // Scope client-reference discovery to the app source dir. Without this,
    // the plugin can walk into node_modules and hit .tsx source files that
    // aren't configured for a loader. Derive from config.source_path so the
    // scope follows shakapacker.yml instead of hardcoding client/app.
    const clientReferencesDir = path.resolve(config.source_path || 'client/app');
    serverWebpackConfig.plugins.push(
      new RSCWebpackPlugin({
        isServer: true,
        clientReferences: [
          { directory: clientReferencesDir, recursive: true, include: /\.(js|ts|jsx|tsx)$/ },
        ],
      }),
    );
  }

  // libraryTarget: 'commonjs2' is required by the Pro Node renderer so it can
  // `require()` the evaluated bundle. No publicPath: the server bundle is
  // loaded from the filesystem, never served over HTTP.
  serverWebpackConfig.output = {
    filename: 'server-bundle.js',
    globalObject: 'this',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../../ssr-generated'),
  };

  serverWebpackConfig.plugins = serverWebpackConfig.plugins.filter(
    (plugin) =>
      plugin.constructor.name !== 'WebpackAssetsManifest' &&
      plugin.constructor.name !== 'MiniCssExtractPlugin' &&
      plugin.constructor.name !== 'CssExtractRspackPlugin' &&
      plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin',
  );

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

  serverWebpackConfig.devtool = 'eval';

  // target: 'node' fixes SSR breakage in libraries (Emotion, loadable-components, etc.)
  // that don't behave under the default 'web' target. node: false disables the
  // polyfill shims that only matter when targeting 'web'.
  serverWebpackConfig.target = 'node';
  serverWebpackConfig.node = false;

  return serverWebpackConfig;
};

module.exports = {
  default: configureServer,
  extractLoader,
};
