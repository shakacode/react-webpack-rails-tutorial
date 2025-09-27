// The source code including full typescript support is available at: 
// https://github.com/shakacode/react_on_rails_demo_ssr_hmr/blob/master/config/webpack/commonWebpackConfig.js

// Common configuration applying to client and server configuration
const { generateWebpackConfig, merge } = require('shakapacker');
const path = require('path');

const baseClientWebpackConfig = generateWebpackConfig();

// Add sass-resources-loader to inject global variables
const sassResourcesLoader = {
  loader: 'sass-resources-loader',
  options: {
    resources: [
      path.resolve(__dirname, '../../client/app/assets/styles/app-variables.scss'),
    ],
  },
};

// Find and update the sass-loader rule
const updateSassLoader = (config) => {
  config.module.rules.forEach((rule) => {
    if (rule.test && rule.test.toString().includes('scss|sass')) {
      if (rule.use) {
        rule.use.push(sassResourcesLoader);
      }
    }
  });
  return config;
};

const commonOptions = {
  resolve: {
    extensions: ['.css', '.ts', '.tsx'],
    alias: {
      libs: path.resolve(__dirname, '../../client/app/libs'),
    },
  },
};

// Copy the object using merge b/c the baseClientWebpackConfig and commonOptions are mutable globals
const commonWebpackConfig = () => {
  const config = merge({}, baseClientWebpackConfig, commonOptions);
  return updateSassLoader(config);
};

module.exports = commonWebpackConfig;