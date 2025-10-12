// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_tutorial_with_ssr_and_hmr_fast_refresh/blob/master/config/webpack/clientWebpackConfig.js

const { config } = require('shakapacker');
const commonWebpackConfig = require('./commonWebpackConfig');

// Auto-detect bundler from shakapacker config and load the appropriate library
const bundler = config.assets_bundler === 'rspack'
  ? require('@rspack/core')
  : require('webpack');

const configureClient = () => {
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

  return clientConfig;
};

module.exports = configureClient;

