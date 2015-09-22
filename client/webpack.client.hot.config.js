// Run like this:
// cd client && node server.js

const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.client.base.config');

// We're using the bootstrap-sass loader.
// See: https://github.com/shakacode/bootstrap-sass-loader
config.entry.vendor.push('bootstrap-sass!./bootstrap-sass.config.js');
config.entry.app.push(
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/dev-server',
  './scripts/webpack_only',
  './assets/javascripts/clientGlobals'
);

config.output = {

  // this file is served directly by webpack
  filename: '[name].js',
  path: __dirname,
};
config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
config.devtool = 'eval-source-map';

// Add the styles
config.resolve.root.push(path.join(__dirname, 'assets/stylesheets'));

// All the styling loaders only apply to hot-reload, not rails
config.module.loaders.push(
  {test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
  {test: /\.css$/, loader: 'style-loader!css-loader'},
  {
    test: /\.scss$/,
    loader: 'style!css!sass?outputStyle=expanded&imagePath=/assets/images&includePaths[]=' +
    path.resolve(__dirname, './assets/stylesheets'),
  },

  // The url-loader uses DataUrls. The file-loader emits files.
  {test: /\.woff$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
  {test: /\.woff2$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
  {test: /\.ttf$/, loader: 'file-loader'},
  {test: /\.eot$/, loader: 'file-loader'},
  {test: /\.svg$/, loader: 'file-loader'});

module.exports = config;
