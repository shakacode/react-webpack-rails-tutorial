const devBuild = process.env.NODE_ENV === 'development';
const isHMR = process.env.WEBPACK_DEV_SERVER === 'TRUE';
const { getBundler } = require('./bundlerUtils');
const environment = require('./environment');

const bundler = getBundler();

if (devBuild && !isHMR) {
  environment.loaders.get('sass').use.find((item) => item.loader === 'sass-loader').options.sourceMap = false;
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
