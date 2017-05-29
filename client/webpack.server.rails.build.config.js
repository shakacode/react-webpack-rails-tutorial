/* eslint comma-dangle: ["error",
  {"functions": "never", "arrays": "only-multiline", "objects": "only-multiline"} ],
  global-require: 0,
  import/no-dynamic-require: 0,
  no-console: 0  */

// Common webpack configuration for server bundle
const { resolve, join } = require('path');
const webpack = require('webpack');
const webpackConfigLoader = require('react-on-rails/webpackConfigLoader');

const configPath = resolve('..', 'config');
const { webpackOutputPath, webpackPublicOutputDir } = webpackConfigLoader(configPath);

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

module.exports = {

  // the project dir
  context: __dirname,
  entry: [
    'babel-polyfill',
    './app/bundles/comments/startup/serverRegistration',
  ],
  output: {
    // Important to NOT use a hash if the server webpack config runs separately from the client one.
    // Otherwise, both would be writing to the same manifest.json file.
    // Additionally, there's no particular need to have a fingerprint (hash) on the server bundle,
    // since it's not cached by the browsers.
    filename: 'server-bundle.js',

    // Leading and trailing slashes ARE necessary.
    publicPath: '/' + webpackPublicOutputDir + '/',
    path: webpackOutputPath,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      libs: resolve(__dirname, 'app', 'libs'),
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
      TRACE_TURBOLINKS: devBuild,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: {
          loader: 'css-loader/locals',
          options: {
            modules: true,
            importLoaders: 0,
            localIdentName: '[name]__[local]__[hash:base64:5]'
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './app/assets/styles/app-variables.scss',
            },
          }
        ],
      },
    ],
  },
};
