const config = require('./webpack.common.config');

config.output = {
  filename: 'server-bundle.js',
  path: '../app/assets/javascripts/generated',

  // CRITICAL for enabling Rails to find the globally exposed variables.
  libaryTarget: 'this',
};

config.entry.push('./assets/javascripts/serverGlobals');

config.module.loaders.push(

      { loader: 'babel-loader' },

      // require Resolve must go first
      // 1. React must be exposed (BOILERPLATE)
      { test: require.resolve('react'), loader: 'expose?React' }
);
module.exports = config;
