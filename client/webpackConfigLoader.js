const { join, resolve } = require('path');
const { env } = require('process');
const { safeLoad } = require('js-yaml');
const { readFileSync } = require('fs');

const configPath = resolve('..', 'config', 'webpack');
const paths = safeLoad(readFileSync(join(configPath, 'paths.yml'), 'utf8'))[env.NODE_ENV];
const devServer = safeLoad(readFileSync(join(configPath, 'development.server.yml'), 'utf8')).development;

const productionBuild = env.NODE_ENV === 'production';

const publicPath = !productionBuild && devServer.enabled ?
  `http://${devServer.host}:${devServer.port}/` : `/${paths.assets}/`;

module.exports = {
  devServer,
  env,
  paths,
  publicPath,
};
