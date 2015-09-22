// Common webpack configuration used by webpack.hot.config and webpack.rails.config.

const path = require('path');

module.exports = {

  // the project dir
  context: __dirname,
  entry: ['./assets/javascripts/serverGlobals'],
  output: {
    filename: 'server-bundle.js',
    path: '../app/assets/javascripts/generated',

    // CRITICAL for enabling Rails to find the globally exposed variables.
    libaryTarget: 'this',
  },
  resolve: {
    root: [
      path.join(__dirname, 'scripts'),
      path.join(__dirname, 'assets/javascripts'),
    ],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', 'config.js'],
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/},

      // React is necessary for the client rendering:
      {test: require.resolve('react'), loader: 'expose?React'},
    ],
  },
};
