/* eslint comma-dangle: ["error",
  {"functions": "never", "arrays": "only-multiline", "objects": "only-multiline"} ] */

// Common client-side webpack configuration used by webpack.hot.config and webpack.rails.config.
const webpack = require('webpack');

const urlFileSizeCutover = 10 * 1024;
const ManifestPlugin = require('webpack-manifest-plugin');
const { resolve } = require('path');
const webpackConfigLoader = require('react-on-rails/webpackConfigLoader');

const configPath = resolve('..', 'config');
const { output } = webpackConfigLoader(configPath);

const devBuild = process.env.NODE_ENV !== 'production';

module.exports = {

  // the project dir
  context: resolve(__dirname),
  entry: {
    // This will contain the app entry points defined by
    // webpack.client.rails.hot.config and webpack.client.rails.build.config

    // See use of 'vendor' in the CommonsChunkPlugin inclusion below.
    'vendor-bundle': [
      'babel-polyfill',
      'es5-shim/es5-shim',
      'es5-shim/es5-sham',
      'jquery',
      'turbolinks',
    ],

    // This will contain the app entry points defined by webpack.hot.config and webpack.rails.config
    'app-bundle': [
      './app/bundles/comments/startup/clientRegistration',
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      libs: resolve(__dirname, 'app/libs'),
    },
    modules: [
      'client/app',
      'client/node_modules',
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendor-bundle',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      }
    }
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
      TRACE_TURBOLINKS: devBuild,
    }),
    new ManifestPlugin({
      publicPath: output.publicPath,
      writeToFileEmit: true
    }),
  ],

  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          limit: urlFileSizeCutover,
          // Remove quotes around the encoded URL –
          // they’re rarely useful
          noquotes: true,
          name: '[name].[hash].[ext]',
          publicPath: output.publicPath,
        },
      },
      {
        test: /\.(ttf|eot)$/,
        use: 'file-loader',
      },
      {
        test: /\.(woff2|woff|jpe?g|png|gif|ico)?$/,
        use: {
          loader: 'resource-url-loader',
          options: {
            name: '[name].[hash].[ext]',
            limit: urlFileSizeCutover,
            publicPath: output.publicPath,
          },
        },
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        exclude: /node_modules/,
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

