/* eslint comma-dangle: ["error",
  {"functions": "never", "arrays": "only-multiline", "objects": "only-multiline"} ] */

// Common client-side webpack configuration used by webpack.hot.config and webpack.rails.config.
const webpack = require('webpack');

const { resolve } = require('path');

const ManifestPlugin = require('webpack-manifest-plugin');

const webpackConfigLoader = require('react-on-rails/webpackConfigLoader');

const configPath = resolve('..', 'config', 'webpack');
const { paths, publicPath } = webpackConfigLoader(configPath);

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

module.exports = {

  // the project dir
  context: resolve(__dirname),
  entry: {

    // See use of 'vendor' in the CommonsChunkPlugin inclusion below.
    'vendor-bundle': [
      'babel-polyfill',
      'es5-shim/es5-shim',
      'es5-shim/es5-sham',
      'jquery',
      'turbolinks',

      // Below libraries are listed as entry points to be sure they get included in the
      // vendor-bundle.js. Note, if we added some library here, but don't use it in the
      // app-bundle.js, then we just wasted a bunch of space.
      'axios',
      'actioncable',
      'classnames',
      'immutable',
      'lodash',
      'marked',
      'react-bootstrap',
      'react-dom',
      'react-redux',
      'react-on-rails',
      'react-router-redux',
      'redux-thunk',
      'react-intl',
    ],

    // This will contain the app entry points defined by webpack.hot.config and webpack.rails.config
    'app-bundle': [
      './app/bundles/comments/startup/clientRegistration',
    ],
  },

  output: {
    filename: '[name].js',
    path: resolve('..', paths.output, paths.assets),
    pathinfo: true,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'client/app',
      'client/node_modules',
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
      TRACE_TURBOLINKS: devBuild,
    }),

    // https://webpack.github.io/docs/list-of-plugins.html#2-explicit-vendor-chunk
    new webpack.optimize.CommonsChunkPlugin({

      // This name 'vendor' ties into the entry definition
      name: 'vendor-bundle',

      // We don't want the default vendor.js name
      filename: 'vendor-bundle.js',

      // Passing Infinity just creates the commons chunk, but moves no modules into it.
      // In other words, we only put what's in the vendor entry definition in vendor-bundle.js
      minChunks: Infinity,

    }),
    new ManifestPlugin({
      fileName: paths.manifest,
      publicPath,
      writeToFileEmit: true,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(ttf|eot)$/,
        use: 'file-loader',
      },
      {
        test: /\.(woff2?|jpe?g|png|gif|svg|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            publicPath,
            name: '[name]-[hash].[ext]',
            limit: 10000,
          },
        },
      },
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            query: 'jQuery'
          },
          {
            loader: 'expose-loader',
            query: '$'
          }
        ]
      },
      {
        test: require.resolve('turbolinks'),
        use: {
          loader: 'imports-loader?this=>window'
        },
      },

      // Use one of these to serve jQuery for Bootstrap scripts:

      // Bootstrap 3
      {
        test: /bootstrap-sass\/assets\/javascripts\//,
        use: {
          loader: 'imports-loader',
          options: {
            jQuery: 'jquery',
          },
        },
      },

      // Bootstrap 4
      {
        test: /bootstrap\/dist\/js\/umd\//,
        use: {
          loader: 'imports-loader',
          options: {
            jQuery: 'jquery',
          },
        },
      },
    ],
  },
};
