const path = require('path');
const { config } = require('shakapacker');
const commonRspackConfig = require('./commonRspackConfig');

const rspack = require('@rspack/core');

const configureServer = () => {
  // We need to use "merge" because the clientConfigObject, EVEN after running
  // toRspackConfig() is a mutable GLOBAL. Thus any changes, like modifying the
  // entry value will result in changing the client config!
  // Using merge into an empty object avoids this issue.
  const serverRspackConfig = commonRspackConfig();

  // We just want the single server bundle entry
  const serverEntry = {
    'server-bundle': serverRspackConfig.entry['server-bundle'],
  };

  if (!serverEntry['server-bundle']) {
    throw new Error(
      "Create a pack with the file name 'server-bundle.js' containing all the server rendering files",
    );
  }

  serverRspackConfig.entry = serverEntry;

  // Remove the mini-css-extract-plugin from the style loaders because
  // the client build will handle exporting CSS.
  // replace file-loader with null-loader
  serverRspackConfig.module.rules.forEach((loader) => {
    if (loader.use && loader.use.filter) {
      loader.use = loader.use.filter(
        (item) => !(typeof item === 'string' && item.match(/mini-css-extract-plugin/)),
      );
    }
  });

  // No splitting of chunks for a server bundle
  serverRspackConfig.optimization = {
    minimize: false,
  };
  serverRspackConfig.plugins.unshift(new rspack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));

  // Custom output for the server-bundle that matches the config in
  // config/initializers/react_on_rails.rb
  // Output to a private directory for SSR bundles (not in public/)
  // Using the default React on Rails path: ssr-generated
  serverRspackConfig.output = {
    filename: 'server-bundle.js',
    globalObject: 'this',
    // If using the React on Rails Pro node server renderer, uncomment the next line
    // libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../../ssr-generated'),
    publicPath: config.publicPath,
    // https://rspack.dev/config/output#outputglobalobject
  };

  // Don't hash the server bundle b/c would conflict with the client manifest
  // And no need for the MiniCssExtractPlugin
  serverRspackConfig.plugins = serverRspackConfig.plugins.filter(
    (plugin) =>
      plugin.constructor.name !== 'WebpackAssetsManifest' &&
      plugin.constructor.name !== 'MiniCssExtractPlugin' &&
      plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin',
  );

  // Configure loader rules for SSR
  // Remove the mini-css-extract-plugin from the style loaders because
  // the client build will handle exporting CSS.
  // replace file-loader with null-loader
  const rules = serverRspackConfig.module.rules;
  rules.forEach((rule) => {
    if (Array.isArray(rule.use)) {
      // remove the mini-css-extract-plugin and style-loader
      rule.use = rule.use.filter((item) => {
        let testValue;
        if (typeof item === 'string') {
          testValue = item;
        } else if (typeof item.loader === 'string') {
          testValue = item.loader;
        }
        return !(testValue.match(/mini-css-extract-plugin/) || testValue === 'style-loader');
      });
      const cssLoader = rule.use.find((item) => {
        let testValue;

        if (typeof item === 'string') {
          testValue = item;
        } else if (typeof item.loader === 'string') {
          testValue = item.loader;
        }

        return testValue.includes('css-loader');
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
  serverRspackConfig.devtool = 'eval';

  // If using the default 'web', then libraries like Emotion and loadable-components
  // break with SSR. The fix is to use a node renderer and change the target.
  // If using the React on Rails Pro node server renderer, uncomment the next line
  // serverRspackConfig.target = 'node'

  return serverRspackConfig;
};

module.exports = configureServer;
