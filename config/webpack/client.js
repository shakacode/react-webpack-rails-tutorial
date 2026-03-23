const devBuild = process.env.NODE_ENV === 'development';
// Set by shakapacker dev-server for both webpack and rspack.
const isHMR = process.env.WEBPACK_DEV_SERVER === 'TRUE';
const { getBundler } = require('./bundlerUtils');
const environment = require('./environment');

const bundler = getBundler();

if (devBuild && !isHMR) {
  const sassLoader = environment.loaders.get('sass');
  const sassLoaderConfig = sassLoader && sassLoader.use.find((item) => item.loader === 'sass-loader');
  if (sassLoaderConfig) {
    sassLoaderConfig.options.sourceMap = false;
  }
}

environment.plugins.append(
  'Provide',
  new bundler.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    jquery: 'jquery',
    'window.jQuery': 'jquery',
    Popper: ['popper.js', 'default'],
  }),
);

module.exports = environment;
