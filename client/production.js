process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// We need to compile both our development JS (for serving to the client) and our server JS
// (for SSR of React components). This is easy enough as we can export arrays of webpack configs.
const clientEnvironment = require('./webpack.client.rails.build.config');
const serverConfig = require('./webpack.server.rails.build.config');

const optimization = {
  splitChunks: {
    chunks: 'async',
    cacheGroups: {
      vendor: {
        chunks: 'async',
        name: 'vendor',
        test: 'vendor',
        enforce: true,
      },
    },
  },
};

clientEnvironment.splitChunks((config) => Object.assign({}, config, { optimization: optimization }));

const clientConfig = clientEnvironment.toWebpackConfig();

module.exports = [clientConfig, serverConfig];
