/**
 * Bundler utilities for Rspack-only configuration.
 *
 * This repository standardizes on Rspack with Shakapacker.
 */

const { config } = require('shakapacker');

// Cache for bundler module
let _cachedBundler = null;

const ensureRspack = () => {
  if (config.assets_bundler !== 'rspack') {
    throw new Error(
      `Invalid assets_bundler: "${config.assets_bundler}". ` +
        'This project is configured for Rspack only. ' +
        'Set assets_bundler: rspack in config/shakapacker.yml',
    );
  }
};

/**
 * Gets the Rspack module for the current build.
 *
 * @returns {Object} @rspack/core module
 * @throws {Error} If assets_bundler is not 'rspack'
 */
const getBundler = () => {
  ensureRspack();

  if (_cachedBundler) {
    return _cachedBundler;
  }

  _cachedBundler = require('@rspack/core');

  return _cachedBundler;
};

/**
 * Validates rspack-only mode and returns true.
 *
 * @returns {boolean} Always true after validation
 */
const isRspack = () => {
  ensureRspack();
  return true;
};

/**
 * Gets the CSS extraction plugin for Rspack.
 *
 * @returns {Object} CssExtractRspackPlugin
 */
const getCssExtractPlugin = () => getBundler().CssExtractRspackPlugin;

module.exports = {
  getBundler,
  isRspack,
  getCssExtractPlugin,
};
