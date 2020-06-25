process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const clientEnvironment = require('./client');
const serverConfig = require('./server');

const clientConfig = clientEnvironment.toWebpackConfig();

module.exports = [clientConfig, serverConfig];
