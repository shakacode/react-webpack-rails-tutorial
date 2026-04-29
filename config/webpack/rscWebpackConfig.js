const { default: serverWebpackConfig, extractLoader } = require('./serverWebpackConfig');

const configureRsc = () => {
  const rscConfig = serverWebpackConfig(true);

  const rscEntry = {
    'rsc-bundle': rscConfig.entry['server-bundle'],
  };
  rscConfig.entry = rscEntry;

  // Runs before babel/swc (webpack loaders execute right-to-left) to detect
  // 'use client' directives in raw source before transpilation. Shakapacker
  // generates rule.use as an array for Babel and as a function for SWC, so
  // handle both forms.
  const { rules } = rscConfig.module;
  rules.forEach((rule) => {
    if (typeof rule.use === 'function') {
      const originalUse = rule.use;
      rule.use = function rscLoaderWrapper(data) {
        const result = originalUse.call(this, data);
        const resultArray = Array.isArray(result) ? result : result ? [result] : [];
        const resolvedRule = { use: resultArray };
        const jsLoader =
          extractLoader(resolvedRule, 'babel-loader') || extractLoader(resolvedRule, 'swc-loader');
        if (jsLoader) {
          return [...resultArray, { loader: 'react-on-rails-rsc/WebpackLoader' }];
        }
        return result;
      };
    } else if (Array.isArray(rule.use)) {
      const jsLoader = extractLoader(rule, 'babel-loader') || extractLoader(rule, 'swc-loader');
      if (jsLoader) {
        rule.use = [...rule.use, { loader: 'react-on-rails-rsc/WebpackLoader' }];
      }
    }
  });

  rscConfig.resolve = {
    ...rscConfig.resolve,
    conditionNames: ['react-server', '...'],
    alias: {
      ...rscConfig.resolve?.alias,
      // RSC payload generation doesn't need react-dom/server; importing
      // it in the react-server environment causes a runtime error.
      'react-dom/server': false,
    },
  };

  rscConfig.output.filename = 'rsc-bundle.js';
  return rscConfig;
};

module.exports = configureRsc;
