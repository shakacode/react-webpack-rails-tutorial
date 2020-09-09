const { environment } = require('@rails/webpacker');
const { resolve } = require('path');

const aliasConfig = require('./alias.js');
const rules = environment.loaders;
const fileLoader = rules.get('file');
const cssLoader = rules.get('moduleCss');
const sassLoader = rules.get('moduleSass');
// const babelLoader = rules.get('babel');
// const ManifestPlugin = environment.plugins.get('Manifest');
const urlFileSizeCutover = 1000; // below 10k, inline, small 1K is to test file loader

// rules
const sassResourcesLoader = {
  loader: 'sass-resources-loader',
  options: {
    resources: [ resolve(__dirname, '../../client/app/assets/styles/app-variables.scss') ],
  },
};

cssLoader.use.push(sassResourcesLoader);
sassLoader.use.push(sassResourcesLoader);

environment.splitChunks();

//adding urlLoader
const urlLoader = {
  test: /\.(jpe?g|png|gif|ico|woff|woff2)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: urlFileSizeCutover,
      // NO leading slash
      name: 'images/[name]-[hash].[ext]',
    },
  },
};
environment.loaders.insert('url', urlLoader, { before: 'file' });

// changing order of babelLoader
// environment.loaders.insert('babel', babelLoader, { before: 'css' });

// add aliases to config
environment.config.merge(aliasConfig);

//changing fileLoader to use proper values
fileLoader.test = /\.(ttf|eot|svg)$/;
fileLoader.use[0].options = { name: 'images/[name]-[hash].[ext]' };

// plugins
// adding definePlugin

module.exports = environment;
