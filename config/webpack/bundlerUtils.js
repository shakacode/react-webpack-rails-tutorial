/**
 * Bundler utilities for automatic Webpack/Rspack detection.
 *
 * Shakapacker 9.1+ supports both Webpack and Rspack as bundlers.
 * The bundler is selected via config/shakapacker.yml:
 *   assets_bundler: webpack  # or 'rspack'
 */

const { config } = require('shakapacker');

/**
 * Gets the appropriate bundler module based on shakapacker.yml configuration.
 *
 * @returns {Object} Either webpack or @rspack/core module
 */
const getBundler = () => {
  return config.assets_bundler === 'rspack'
    ? require('@rspack/core')
    : require('webpack');
};

/**
 * Checks if the current bundler is Rspack.
 *
 * @returns {boolean} True if using Rspack, false if using Webpack
 */
const isRspack = () => config.assets_bundler === 'rspack';

/**
 * Gets the appropriate CSS extraction plugin for the current bundler.
 *
 * @returns {Object} Either mini-css-extract-plugin (Webpack) or CssExtractRspackPlugin (Rspack)
 */
const getCssExtractPlugin = () => {
  return isRspack()
    ? getBundler().CssExtractRspackPlugin
    : require('mini-css-extract-plugin');
};

module.exports = {
  getBundler,
  isRspack,
  getCssExtractPlugin,
};
