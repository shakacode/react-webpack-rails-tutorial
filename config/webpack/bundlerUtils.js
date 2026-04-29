// Returns the active bundler module per shakapacker.yml's `assets_bundler`.
// Supports both webpack and rspack so this project can switch between them
// without touching every config file.

const { config } = require('shakapacker');

let _cachedBundler = null;

const getBundler = () => {
  if (_cachedBundler) {
    return _cachedBundler;
  }

  _cachedBundler = config.assets_bundler === 'rspack' ? require('@rspack/core') : require('webpack');

  return _cachedBundler;
};

const isRspack = () => config.assets_bundler === 'rspack';

// Only meaningful on rspack — webpack projects use mini-css-extract-plugin
// via shakapacker's generated config.
const getCssExtractPlugin = () => {
  if (!isRspack()) {
    throw new Error(
      'getCssExtractPlugin() is only available when assets_bundler is rspack. ' +
        "On webpack, rely on shakapacker's generated MiniCssExtractPlugin configuration.",
    );
  }
  return getBundler().CssExtractRspackPlugin;
};

module.exports = {
  getBundler,
  isRspack,
  getCssExtractPlugin,
};
