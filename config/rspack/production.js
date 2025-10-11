process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const rspackConfig = require('./rspackConfig');

const productionEnvOnly = (_clientRspackConfig, _serverRspackConfig) => {
  // place any code here that is for production only
};

module.exports = rspackConfig(productionEnvOnly);
