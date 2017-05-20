/* eslint no-var: 0, no-console: 0, import/no-extraneous-dependencies: 0 */

import webpack from 'webpack';

import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack.client.rails.hot.config';

const { resolve } = require('path');

const webpackConfigLoader = require('react-on-rails/webpackConfigLoader');

const configPath = resolve('..', 'config');
const { hotReloadingUrl, hotReloadingPort, hotReloadingHostname } = webpackConfigLoader(configPath);

const compiler = webpack(webpackConfig);

const devServer = new WebpackDevServer(compiler, {
  proxy: {
    '*': `http://lvh.me:${hotReloadingPort}`,
  },
  contentBase: hotReloadingUrl,
  hot: true,
  inline: true,
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false,
  },
});

devServer.listen(hotReloadingPort, hotReloadingHostname, (err) => {
  if (err) console.error(err);
  console.log(
    `=> 🔥  Webpack development server is running on ${hotReloadingUrl}`,
  );
});
