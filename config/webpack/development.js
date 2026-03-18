// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_tutorial_with_ssr_and_hmr_fast_refresh/blob/master/config/webpack/development.js

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const { inliningCss } = require('shakapacker');
const ReactRefreshRspackPlugin = require('@rspack/plugin-react-refresh');

const webpackConfig = require('./webpackConfig');

const developmentEnvOnly = (clientWebpackConfig, _serverWebpackConfig) => {
  if (inliningCss) {
    clientWebpackConfig.plugins.push(new ReactRefreshRspackPlugin());
  }
};

module.exports = webpackConfig(developmentEnvOnly);
