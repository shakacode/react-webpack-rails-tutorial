/* eslint-disable max-classes-per-file */
/* eslint-disable global-require */
/**
 * Unit tests for bundlerUtils.js in Rspack-only mode.
 */

jest.mock('@rspack/core', () => ({
  ProvidePlugin: class MockRspackProvidePlugin {},
  CssExtractRspackPlugin: class MockCssExtractRspackPlugin {},
  optimize: { LimitChunkCountPlugin: class MockRspackLimitChunkCount {} },
}));

describe('bundlerUtils', () => {
  let mockConfig;

  beforeEach(() => {
    jest.resetModules();
    mockConfig = { assets_bundler: 'rspack' };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBundler()', () => {
    it('returns rspack when assets_bundler is rspack', () => {
      mockConfig.assets_bundler = 'rspack';
      jest.doMock('shakapacker', () => ({ config: mockConfig }));
      const utils = require('../../../config/webpack/bundlerUtils');

      const bundler = utils.getBundler();

      expect(bundler).toBeDefined();
      expect(bundler.CssExtractRspackPlugin).toBeDefined();
      expect(bundler.CssExtractRspackPlugin.name).toBe('MockCssExtractRspackPlugin');
    });

    it('throws when assets_bundler is webpack', () => {
      mockConfig.assets_bundler = 'webpack';
      jest.doMock('shakapacker', () => ({ config: mockConfig }));
      const utils = require('../../../config/webpack/bundlerUtils');

      expect(() => utils.getBundler()).toThrow('configured for Rspack only');
    });

    it('throws when assets_bundler is undefined', () => {
      mockConfig.assets_bundler = undefined;
      jest.doMock('shakapacker', () => ({ config: mockConfig }));
      const utils = require('../../../config/webpack/bundlerUtils');

      expect(() => utils.getBundler()).toThrow('configured for Rspack only');
    });

    it('throws when assets_bundler is invalid', () => {
      mockConfig.assets_bundler = 'invalid-bundler';
      jest.doMock('shakapacker', () => ({ config: mockConfig }));
      const utils = require('../../../config/webpack/bundlerUtils');

      expect(() => utils.getBundler()).toThrow('configured for Rspack only');
    });

    it('returns cached bundler on subsequent calls', () => {
      mockConfig.assets_bundler = 'rspack';
      jest.doMock('shakapacker', () => ({ config: mockConfig }));
      const utils = require('../../../config/webpack/bundlerUtils');

      const bundler1 = utils.getBundler();
      const bundler2 = utils.getBundler();

      expect(bundler1).toBe(bundler2);
    });
  });

  describe('getCssExtractPlugin()', () => {
    it('returns CssExtractRspackPlugin when using rspack', () => {
      mockConfig.assets_bundler = 'rspack';
      jest.doMock('shakapacker', () => ({ config: mockConfig }));
      const utils = require('../../../config/webpack/bundlerUtils');

      const plugin = utils.getCssExtractPlugin();

      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('MockCssExtractRspackPlugin');
    });

    it('throws when assets_bundler is not rspack', () => {
      mockConfig.assets_bundler = 'webpack';
      jest.doMock('shakapacker', () => ({ config: mockConfig }));
      const utils = require('../../../config/webpack/bundlerUtils');

      expect(() => utils.getCssExtractPlugin()).toThrow('configured for Rspack only');
    });
  });
});
