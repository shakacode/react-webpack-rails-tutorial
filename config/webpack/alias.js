const { resolve } = require('path');

module.exports = {
  resolve: {
    alias: {
      Assets: resolve(__dirname, '..', '..', 'client', 'app', 'assets'),
      libs: resolve(__dirname, '..', '..', 'client', 'app', 'libs'),
    },
  },
};
