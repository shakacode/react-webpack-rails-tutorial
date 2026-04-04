// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_tutorial_with_ssr_and_hmr_fast_refresh/blob/master/config/webpack/clientWebpackConfig.js

const commonWebpackConfig = require('./commonWebpackConfig');
const { getBundler } = require('./bundlerUtils');
const { RspackRscPlugin } = require('./rspackRscPlugin');

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

  // RSC: Generate react-client-manifest.json for client component resolution
  clientConfig.plugins.push(new RspackRscPlugin({ isServer: false }));

  // server-bundle and rsc-bundle should ONLY be built by their respective configs.
  // In case these entries are not deleted, a very strange "window" not found
  // error shows referring to window["webpackJsonp"]. That is because the
  // client config is going to try to load chunks.
  delete clientConfig.entry['server-bundle'];
  delete clientConfig.entry['rsc-bundle'];

  // react-on-rails-pro includes server-side code that imports Node.js modules.
  // Provide empty fallbacks for the client bundle so it doesn't fail to resolve them.
  clientConfig.resolve = {
    ...clientConfig.resolve,
    fallback: {
      ...clientConfig.resolve?.fallback,
      path: false,
      fs: false,
      'fs/promises': false,
      stream: false,
    },
  };

  return clientConfig;
};

module.exports = configureClient;

