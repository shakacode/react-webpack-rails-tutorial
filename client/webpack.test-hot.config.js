// File helpful for debugging issues with dependencies only used by the hot reload server
// node-debug webpack --config webpack.test-hot.config.js

'use strict';
var path = require('path');
var config = require('./webpack.common.config');

// We're using the bootstrap-sass loader.
// See: https://github.com/justin808/bootstrap-sass-loader
config.entry.push('./scripts/webpack_only',

  // custom bootstrap
  'bootstrap-sass!./bootstrap-sass.config.js');
config.output = {

  // this file is served directly by webpack
  filename: 'express-bundle.js',
  path: __dirname
};
config.devtool = 'eval-source-map';

// All the styling loaders only apply to hot-reload, not rails
config.module.loaders.push(
  {test: /\.jsx$/, loaders: ['react-hot', 'es6', 'jsx?harmony']},
  {test: /\.css$/, loader: 'style-loader!css-loader'},
  {
    test: /\.scss$/,
    loader: 'style!css!sass?outputStyle=expanded&imagePath=/assets/images&includePaths[]=' +
    path.resolve(__dirname, './assets/stylesheets')
  },

  // The url-loader uses DataUrls. The file-loader emits files.
  {test: /\.woff$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'},
  {test: /\.woff2$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'},
  {test: /\.ttf$/, loader: 'file-loader'},
  {test: /\.eot$/, loader: 'file-loader'},
  {test: /\.svg$/, loader: 'file-loader'});

module.exports = config;
