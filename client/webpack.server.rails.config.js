// Common webpack configuration for server bundle

module.exports = {

  // the project dir
  context: __dirname,
  entry: ['./app/startup/serverGlobals'],
  output: {
    filename: 'server-bundle.js',
    path: '../app/assets/javascripts/generated',

    // CRITICAL for enabling Rails to find the globally exposed variables.
    libaryTarget: 'this',
  },
  resolve: {
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
