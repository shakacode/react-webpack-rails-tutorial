const { env } = require('shakapacker');

const customConfig = {
  options: {
    jsc: {
      // Preserve class names for Stimulus controller discovery
      keepClassNames: true,
      transform: {
        react: {
          // Enable React Fast Refresh in development
          refresh: env.isDevelopment && env.runningWebpackDevServer,
        },
      },
    },
  },
};

module.exports = customConfig;
