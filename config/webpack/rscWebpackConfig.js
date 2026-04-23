const { default: serverWebpackConfig, extractLoader } = require('./serverWebpackConfig');

const configureRsc = () => {
  const rscConfig = serverWebpackConfig(true);

  const rscEntry = {
    'rsc-bundle': rscConfig.entry['server-bundle'],
  };
  rscConfig.entry = rscEntry;

  // Runs before babel-loader (webpack loaders execute right-to-left) to
  // detect 'use client' directives in raw source before transpilation.
  const { rules } = rscConfig.module;
  rules.forEach((rule) => {
    if (Array.isArray(rule.use)) {
      const babelLoader = extractLoader(rule, 'babel-loader');
      if (babelLoader) {
        rule.use.push({
          loader: 'react-on-rails-rsc/WebpackLoader',
        });
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
