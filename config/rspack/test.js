process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const rspackConfig = require('./rspackConfig');

module.exports = rspackConfig();
