// The source code including full typescript support is available at: 
// https://github.com/shakacode/react_on_rails_demo_ssr_hmr/blob/master/config/webpack/test.js

const generateWebpackConfigs = require('./generateWebpackConfigs')

const testOnly = (_clientWebpackConfig, _serverWebpackConfig) => {
  // place any code here that is for test only
}

module.exports = generateWebpackConfigs(testOnly)
