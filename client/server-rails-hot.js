/* eslint no-var: 0, no-console: 0, import/no-extraneous-dependencies: 0 */

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack.client.rails.hot.config';

const { devServer: devServerConfig, publicPath } = require('./webpackConfigLoader.js');

const compiler = webpack(webpackConfig);

const devServer = new WebpackDevServer(compiler, {
  proxy: {
    '*': `http://lvh.me:${devServerConfig.port}`,
  },
  publicPath,
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

devServer.listen(devServerConfig.port, 'localhost', (err) => {
  if (err) console.error(err);
  console.log(
    `=> 🔥  Webpack development server is running on port ${devServerConfig.port}`,
  );
});
