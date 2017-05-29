/* eslint comma-dangle: ["error",
  {"functions": "never", "arrays": "only-multiline", "objects": "only-multiline"} ] */

// Run with Rails server like this:
// rails s
// cd client && babel-node server-rails-hot.js
// Note that Foreman (Procfile.dev) has also been configured to take care of this.

const webpack = require('webpack');
const merge = require('webpack-merge');
const { resolve } = require('path');
const config = require('./webpack.client.base.config');
const webpackConfigLoader = require('react-on-rails/webpackConfigLoader');

const configPath = resolve('..', 'config');
const { hotReloadingUrl, webpackOutputPath } = webpackConfigLoader(configPath);

module.exports = merge(config, {
  devtool: 'eval-source-map',

  entry: {
    'app-bundle': [
      `webpack-dev-server/client?${hotReloadingUrl}`,
      'webpack/hot/only-dev-server'
    ],

    // These are Rails specific
    'vendor-bundle': [
      'jquery-ujs',
      'bootstrap-loader'
    ],
  },

  output: {
    filename: '[name].js',
    path: webpackOutputPath,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: [
            [
              'react-transform',
              {
                superClasses: ['React.Component', 'BaseComponent', 'Component'],
                transforms: [
                  {
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module'],
                  },
                ],
              },
            ],
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 0,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: 'autoprefixer'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 3,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: 'autoprefixer'
            }
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './app/assets/styles/app-variables.scss'
            },
          }
        ],
      },
      {
        test: require.resolve('jquery-ujs'),
        use: {
          loader: 'imports-loader',
          options: {
            jQuery: 'jquery',
          }
        }
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});

console.log('Webpack HOT dev build for Rails'); // eslint-disable-line no-console
