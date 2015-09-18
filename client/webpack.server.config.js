const config = require('./webpack.common.config');

config.output = {
  filename: 'server-bundle.js',
  path: '../app/assets/javascripts/generated',

  // CRITICAL for enabling Rails to find the globally exposed variables.
  libaryTarget: 'this',
};

config.entry.app.push('./assets/javascripts/serverGlobals');

config.module.loaders.push({ loader: 'babel-loader' });
module.exports = config;
