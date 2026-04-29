// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_tutorial_with_ssr_and_hmr_fast_refresh/blob/master/config/webpack/clientWebpackConfig.js

const path = require('path');
const { config } = require('shakapacker');
const { RSCWebpackPlugin } = require('react-on-rails-rsc/WebpackPlugin');
const commonWebpackConfig = require('./commonWebpackConfig');
const { getBundler } = require('./bundlerUtils');

const configureClient = () => {
  const bundler = getBundler();
  const clientConfig = commonWebpackConfig();

  clientConfig.plugins.push(
    new bundler.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      ActionCable: '@rails/actioncable',
    }),
  );

  // server-bundle is special and should ONLY be built by the serverConfig
  // In case this entry is not deleted, a very strange "window" not found
  // error shows referring to window["webpackJsonp"]. That is because the
  // client config is going to try to load chunks.
  delete clientConfig.entry['server-bundle'];

  const clientReferencesDir = path.resolve(config.source_path || 'client/app');
  clientConfig.plugins.push(
    new RSCWebpackPlugin({
      isServer: false,
      clientReferences: [
        { directory: clientReferencesDir, recursive: true, include: /\.(js|ts|jsx|tsx)$/ },
      ],
    }),
  );

  return clientConfig;
};

module.exports = configureClient;

