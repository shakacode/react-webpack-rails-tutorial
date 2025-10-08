// Babel config is only used by Jest (babel-jest) and ESLint (@babel/eslint-parser)
// Production webpack builds use SWC instead (see config/swc.config.js)
module.exports = function (api) {
  const defaultConfigFunc = require('shakapacker/package/babel/preset.js');
  const resultConfig = defaultConfigFunc(api);

  // Add React preset for Jest testing
  // Note: @babel/preset-react is provided by Shakapacker's dependencies
  const changesOnDefault = {
    presets: [
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
          development: true, // Always use development mode for better test error messages
          useBuiltIns: true,
        },
      ],
    ],
  };

  resultConfig.presets = [...resultConfig.presets, ...changesOnDefault.presets];

  return resultConfig;
};
