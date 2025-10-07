const { env } = require('shakapacker');

const customConfig = {
  options: {
    jsc: {
      // Preserve class names for Stimulus controller discovery
      keepClassNames: true,
      transform: {
        react: {
          // Use automatic runtime (React 17+) - no need to import React
          runtime: 'automatic',
          // Enable React Fast Refresh in development
          refresh: env.isDevelopment && env.runningWebpackDevServer,
        },
      },
    },
  },
};

module.exports = customConfig;
