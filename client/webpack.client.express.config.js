/* eslint comma-dangle: ["error",
  {"functions": "never", "arrays": "only-multiline", "objects": "only-multiline"} ] */

// Run like this:
// cd client && node server-express.js

const webpack = require('webpack');

const config = require('./webpack.client.base.config');

const hotPort = process.env.HOT_PORT || 4000;

config.entry.vendor.push('bootstrap-loader');
config.entry.app.push(

  // Shouldn't be necessary:
  // https://github.com/shakacode/react_on_rails/issues/504
  './app/bundles/comments/startup/ClientRouterAppExpress',

  // Webpack dev server
  `webpack-dev-server/client?http://localhost:${hotPort}`,
  'webpack/hot/dev-server'
);

config.output = {

  // this file is served directly by webpack
  filename: '[name].js',
  path: __dirname,
};
config.plugins.unshift(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
);
config.devtool = 'eval-source-map';

// All the styling loaders only apply to hot-reload, not rails
config.module.rules.push(
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
  }
);

module.exports = config;
