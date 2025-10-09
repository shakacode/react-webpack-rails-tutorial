const rspack = require('@rspack/core');
const commonRspackConfig = require('./commonRspackConfig');

const configureClient = () => {
  const clientConfig = commonRspackConfig();

  clientConfig.plugins.push(
    new rspack.ProvidePlugin({
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
