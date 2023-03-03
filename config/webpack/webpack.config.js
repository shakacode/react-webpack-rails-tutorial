const { env, webpackConfig, merge } = require('shakapacker');
const { existsSync } = require('fs');
const { resolve } = require('path');

const envSpecificConfig = () => {
  const path = resolve(__dirname, `${env.nodeEnv}.js`);
  if (existsSync(path)) {
    console.log(`Loading ENV specific webpack configuration file ${path}`);
    return require(path);
  } else {
    return webpackConfig;
  }
};

module.exports = merge(envSpecificConfig(), {
  ignoreWarnings: [/Module not found: Error: Can't resolve 'react-dom\/client'/],
});
