/**
 * Unit tests for bundlerUtils.js
 * Tests bundler auto-detection and helper functions
 *
 * Note: These tests verify the bundler selection logic without actually
 * loading Rspack (which requires Node.js globals not available in jsdom).
 */

// Mock the bundler packages to avoid loading them
jest.mock('webpack', () => ({
  ProvidePlugin: class MockProvidePlugin {},
  optimize: { LimitChunkCountPlugin: class MockLimitChunkCount {} },
}));

jest.mock('@rspack/core', () => ({
  ProvidePlugin: class MockRspackProvidePlugin {},
  CssExtractRspackPlugin: class MockCssExtractRspackPlugin {},
  optimize: { LimitChunkCountPlugin: class MockRspackLimitChunkCount {} },
}));

jest.mock('mini-css-extract-plugin', () => class MiniCssExtractPlugin {});

describe('bundlerUtils', () => {
  let mockConfig;

  beforeEach(() => {
    // Reset module cache
    jest.resetModules();

    // Create fresh mock config
    mockConfig = { assets_bundler: 'webpack' };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBundler()', () => {
    it('returns webpack when assets_bundler is webpack', () => {
      mockConfig.assets_bundler = 'webpack';
      jest.doMock('shakapacker', () => ({ config: mockConfig }));
      const utils = require('../../../config/webpack/bundlerUtils');

      const bundler = utils.getBundler();

      expect(bundler).toBeDefined();
      expect(bundler.ProvidePlugin).toBeDefined();
      expect(bundler.ProvidePlugin.name).toBe('MockProvidePlugin');
    });

    it('returns rspack when assets_bundler is rspack', () => {
      mockConfig.assets_bundler = 'rspack';
      jest.doMock('shakapacker', () => ({ config: mockConfig }));
      const utils = require('../../../config/webpack/bundlerUtils');

      const bundler = utils.getBundler();

      expect(bundler).toBeDefined();
      // Rspack has CssExtractRspackPlugin
      expect(bundler.CssExtractRspackPlugin).toBeDefined();
      expect(bundler.CssExtractRspackPlugin.name).toBe('MockCssExtractRspackPlugin');
    });
  });

  describe('isRspack()', () => {
    it('returns false when assets_bundler is webpack', () => {
      mockConfig.assets_bundler = 'webpack';
      jest.doMock('shakapacker', () => ({ config: mockConfig }));
      const utils = require('../../../config/webpack/bundlerUtils');

      expect(utils.isRspack()).toBe(false);
    });

    it('returns true when assets_bundler is rspack', () => {
      mockConfig.assets_bundler = 'rspack';
      jest.doMock('shakapacker', () => ({ config: mockConfig }));
      const utils = require('../../../config/webpack/bundlerUtils');

      expect(utils.isRspack()).toBe(true);
    });
  });

  describe('getCssExtractPlugin()', () => {
    it('returns mini-css-extract-plugin when using webpack', () => {
      mockConfig.assets_bundler = 'webpack';
      jest.doMock('shakapacker', () => ({ config: mockConfig }));
      const utils = require('../../../config/webpack/bundlerUtils');

      const plugin = utils.getCssExtractPlugin();

      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('MiniCssExtractPlugin');
    });

    it('returns CssExtractRspackPlugin when using rspack', () => {
      mockConfig.assets_bundler = 'rspack';
      jest.doMock('shakapacker', () => ({ config: mockConfig }));
      const utils = require('../../../config/webpack/bundlerUtils');

      const plugin = utils.getCssExtractPlugin();

      expect(plugin).toBeDefined();
      // Rspack plugin class name
      expect(plugin.name).toBe('MockCssExtractRspackPlugin');
    });
  });
});
