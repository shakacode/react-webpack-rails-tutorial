// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_tutorial_with_ssr_and_hmr_fast_refresh/blob/master/config/webpack/webpackConfig.js

const clientWebpackConfig = require('./clientWebpackConfig');
const { default: serverWebpackConfig } = require('./serverWebpackConfig');
const rscWebpackConfig = require('./rscWebpackConfig');

const webpackConfig = (envSpecific) => {
  const clientConfig = clientWebpackConfig();
  const serverConfig = serverWebpackConfig();

  if (envSpecific) {
    envSpecific(clientConfig, serverConfig);
  }

  let result;
  // For HMR, need to separate the the client and server webpack configurations
  if (process.env.WEBPACK_SERVE || process.env.CLIENT_BUNDLE_ONLY) {
    // eslint-disable-next-line no-console
    console.log('[React on Rails] Creating only the client bundles.');
    result = clientConfig;
  } else if (process.env.SERVER_BUNDLE_ONLY) {
    // eslint-disable-next-line no-console
    console.log('[React on Rails] Creating only the server bundle.');
    result = serverConfig;
  } else if (process.env.RSC_BUNDLE_ONLY) {
    // eslint-disable-next-line no-console
    console.log('[React on Rails] Creating only the RSC bundle.');
    result = rscWebpackConfig();
  } else {
    // eslint-disable-next-line no-console
    console.log('[React on Rails] Creating client, server, and RSC bundles.');
    result = [clientConfig, serverConfig, rscWebpackConfig()];
  }

  // To debug, uncomment next line and inspect "result"
  // debugger
  return result;
};

module.exports = webpackConfig;
