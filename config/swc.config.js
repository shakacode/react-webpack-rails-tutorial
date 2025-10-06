const { env } = require('shakapacker');

const customConfig = {
  options: {
    jsc: {
      transform: {
        react: {
          refresh: env.isDevelopment && env.runningWebpackDevServer,
        },
      },
    },
  },
};

module.exports = customConfig;
