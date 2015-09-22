// Common webpack configuration used by webpack.hot.config and webpack.rails.config.

const webpack = require('webpack');
const path = require('path');

module.exports = {

  // the project dir
  context: __dirname,
  entry: {
    vendor: [
      'jquery',
      'jquery-ujs',
    ],
    app: [],
  },
  resolve: {
    root: [
      path.join(__dirname, 'scripts'),
      path.join(__dirname, 'assets/javascripts'),
    ],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.scss', '.css', 'config.js'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app'],
      filename: 'vendor.js',
      minChunks: Infinity,
    }),
  ],
  module: {
    loaders: [

      // React is necessary for the client rendering:
      {test: require.resolve('react'), loader: 'expose?React'},
      {test: require.resolve('jquery'), loader: 'expose?jQuery'},
      {test: require.resolve('jquery'), loader: 'expose?$'},
    ],
  },
};
