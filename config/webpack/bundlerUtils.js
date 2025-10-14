/**
 * Bundler utilities for automatic Webpack/Rspack detection.
 *
 * Shakapacker 9.1+ supports both Webpack and Rspack as bundlers.
 * The bundler is selected via config/shakapacker.yml:
 *   assets_bundler: webpack  # or 'rspack'
 */

const { config } = require('shakapacker');

const VALID_BUNDLERS = ['webpack', 'rspack'];

// Cache for bundler module
// IMPORTANT: Shakapacker config is immutable at runtime - it's loaded once when the
// Node process starts. Changing shakapacker.yml requires restarting the server.
// This cache is safe because config.assets_bundler cannot change during execution.
let _cachedBundler = null;
let _cachedBundlerType = null;

/**
 * Gets the appropriate bundler module based on shakapacker.yml configuration.
 *
 * Note: The bundler configuration is read from shakapacker.yml at startup.
 * Changing the config requires restarting the Node process. This function
 * memoizes the result for performance.
 *
 * @returns {Object} Either webpack or @rspack/core module
 * @throws {Error} If assets_bundler is not 'webpack' or 'rspack'
 */
const getBundler = () => {
  // Return cached bundler if config hasn't changed
  if (_cachedBundler && _cachedBundlerType === config.assets_bundler) {
    return _cachedBundler;
  }

  // Validate bundler configuration
  const bundlerType = config.assets_bundler || 'webpack'; // Default to webpack
  if (!VALID_BUNDLERS.includes(bundlerType)) {
    throw new Error(
      `Invalid assets_bundler: "${bundlerType}". ` +
      `Must be one of: ${VALID_BUNDLERS.join(', ')}. ` +
      `Check config/shakapacker.yml`,
    );
  }

  // Load and cache the bundler module
  _cachedBundlerType = bundlerType;
  _cachedBundler = bundlerType === 'rspack'
    ? require('@rspack/core')
    : require('webpack');

  return _cachedBundler;
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
