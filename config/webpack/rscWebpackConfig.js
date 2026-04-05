// RSC (React Server Components) bundle configuration.
//
// This creates a third bundle alongside client and server bundles.
// The RSC bundle runs server components in the Node renderer and produces
// the Flight payload that React uses to hydrate on the client.
//
// Unlike the server bundle (which uses ExecJS), the RSC bundle targets Node.js
// and can use Node.js built-in modules like os, fs, path, etc.

const path = require('path');
const { config } = require('shakapacker');
const commonWebpackConfig = require('./commonWebpackConfig');
const { getBundler } = require('./bundlerUtils');
const { RspackRscPlugin } = require('./rspackRscPlugin');

function extractLoader(rule, loaderName) {
  if (!Array.isArray(rule.use)) return null;
  return rule.use.find((item) => {
    const testValue = typeof item === 'string' ? item : item?.loader;
    return testValue && testValue.includes(loaderName);
  });
}

const configureRsc = () => {
  const bundler = getBundler();
  const rscConfig = commonWebpackConfig();

  // Use the dedicated rsc-bundle entry point
  const rscEntry = rscConfig.entry['rsc-bundle'];
  if (!rscEntry) {
    throw new Error(
      'RSC bundle entry not found. Ensure client/app/packs/rsc-bundle.js exists.',
    );
  }
  rscConfig.entry = { 'rsc-bundle': rscEntry };

  // Remove CSS extraction plugins (same as server config — CSS handled by client)
  rscConfig.plugins = rscConfig.plugins.filter(
    (plugin) =>
      plugin.constructor.name !== 'WebpackAssetsManifest' &&
      plugin.constructor.name !== 'MiniCssExtractPlugin' &&
      plugin.constructor.name !== 'CssExtractRspackPlugin' &&
      plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin',
  );

  // Remove CSS extraction loaders from style rules
  rscConfig.module.rules.forEach((rule) => {
    if (Array.isArray(rule.use)) {
      rule.use = rule.use.filter((item) => {
        const testValue = typeof item === 'string' ? item : item?.loader;
        return !(
          testValue?.match(/mini-css-extract-plugin/) ||
          testValue?.match(/CssExtractRspackPlugin/) ||
          testValue?.includes('cssExtractLoader') ||
          testValue === 'style-loader'
        );
      });
      const cssLoader = rule.use.find((item) => {
        const testValue = typeof item === 'string' ? item : item?.loader;
        return testValue?.includes('css-loader');
      });
      if (cssLoader?.options?.modules) {
        cssLoader.options.modules = { ...cssLoader.options.modules, exportOnlyLocals: true };
      }
    } else if (
      rule.use?.loader
      && (rule.use.loader.includes('url-loader') || rule.use.loader.includes('file-loader'))
    ) {
      rule.use.options = { ...(rule.use.options || {}), emitFile: false };
    }
  });

  // Add the RSC WebpackLoader to transpiler rules.
  // This loader handles 'use client' directive detection and server/client component separation.
  rscConfig.module.rules.forEach((rule) => {
    if (Array.isArray(rule.use)) {
      const transpilerLoader = extractLoader(rule, 'swc-loader') || extractLoader(rule, 'babel-loader');
      if (transpilerLoader) {
        rule.use.push({
          loader: 'react-on-rails-rsc/WebpackLoader',
        });
      }
    }
  });

  // Enable react-server condition for server component resolution
  rscConfig.resolve = {
    ...rscConfig.resolve,
    conditionNames: ['react-server', '...'],
  };

  // No code splitting for the RSC bundle
  rscConfig.optimization = { minimize: false };
  rscConfig.plugins.unshift(new bundler.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));

  // Output to the same SSR directory as the server bundle
  rscConfig.output = {
    filename: 'rsc-bundle.js',
    globalObject: 'this',
    path: path.resolve(__dirname, '../../ssr-generated'),
    publicPath: config.publicPath,
  };

  // Target Node.js so server-only modules (os, fs, stream, etc.) resolve correctly
  rscConfig.target = 'node';
  rscConfig.devtool = 'eval';

  // RSC manifest plugin
  rscConfig.plugins.push(new RspackRscPlugin({ isServer: true }));

  return rscConfig;
};

module.exports = configureRsc;
