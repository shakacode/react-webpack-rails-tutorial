const devBuild = process.env.NODE_ENV === 'development';
const isHMR = process.env.WEBPACK_DEV_SERVER === 'TRUE';
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { config } = require('shakapacker');
const environment = require('./environment');

// Auto-detect bundler from shakapacker config and load the appropriate library
const bundler = config.assets_bundler === 'rspack'
  ? require('@rspack/core')
  : require('webpack');

if (devBuild && !isHMR) {
  environment.loaders.get('sass').use.find((item) => item.loader === 'sass-loader').options.sourceMap = false;
}

environment.plugins.append(
  'Provide',
  new bundler.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    jquery: 'jquery',
    'window.jQuery': 'jquery',
    Popper: ['popper.js', 'default'],
  }),
);

if (devBuild && isHMR) {
  environment.plugins.insert('ReactRefreshWebpackPlugin', new ReactRefreshWebpackPlugin());
}

module.exports = environment;
