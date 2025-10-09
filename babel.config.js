// Babel config is only used by Jest (babel-jest) and ESLint (@babel/eslint-parser)
// Production webpack builds use SWC instead (see config/swc.config.js)
module.exports = function (api) {
  const defaultConfigFunc = require('shakapacker/package/babel/preset.js');
  const resultConfig = defaultConfigFunc(api);
  const isProductionEnv = api.env('production');

  // Add React preset for Jest testing and ESLint
  // Note: @babel/preset-react is in devDependencies (only needed for Jest/ESLint, not webpack)
  const changesOnDefault = {
    presets: [
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
          // Use development mode for better error messages in tests and development
          development: !isProductionEnv,
          useBuiltIns: true,
        },
      ],
    ],
  };

  resultConfig.presets = [...resultConfig.presets, ...changesOnDefault.presets];

  return resultConfig;
};
