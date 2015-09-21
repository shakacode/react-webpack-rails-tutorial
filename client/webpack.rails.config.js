// Run like this:
// cd client && $(npm bin)/webpack -w --config webpack.rails.config.js
// Note that Foreman (Procfile.dev) has also been configured to take care of this.

// NOTE: All style sheets handled by the asset pipeline in rails

const config = require('./webpack.common.config');

config.output = {
  filename: 'client-bundle.js',
  path: '../app/assets/javascripts/generated',
};

// You can add entry points specific to rails here
config.entry.push('./scripts/rails_only', './assets/javascripts/clientGlobals');

// See webpack.common.config for adding modules common to both the webpack dev server and rails

config.module.loaders.push(
  {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
);
module.exports = config;

// Next line is Heroku specific. You'll have BUILDPACK_URL defined for your Heroku install.
const devBuild = (typeof process.env.BUILDPACK_URL) === 'undefined';
if (devBuild) {
  console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
  module.exports.devtool = 'eval-source-map';
} else {
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}
