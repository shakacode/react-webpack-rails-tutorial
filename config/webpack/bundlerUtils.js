/**
 * Bundler utilities. Returns the active bundler module based on shakapacker.yml's
 * `assets_bundler` setting. Supports both webpack and rspack so this project can
 * switch between them without touching every config file.
 */

const { config } = require('shakapacker');

let _cachedBundler = null;

/**
 * Gets the bundler module for the current build.
 *
 * @returns {Object} webpack or @rspack/core module
 */
const getBundler = () => {
  if (_cachedBundler) {
    return _cachedBundler;
  }

  _cachedBundler = config.assets_bundler === 'rspack' ? require('@rspack/core') : require('webpack');

  return _cachedBundler;
};

/**
 * Checks whether the configured bundler is Rspack.
 *
 * @returns {boolean} True when assets_bundler is rspack
 */
const isRspack = () => config.assets_bundler === 'rspack';

/**
 * Gets the CSS extraction plugin. Only meaningful on rspack — webpack projects
 * use mini-css-extract-plugin directly via shakapacker's generated config.
 *
 * @returns {Object} CssExtractRspackPlugin
 * @throws {Error} If assets_bundler is not rspack
 */
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
