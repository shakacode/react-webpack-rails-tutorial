const { env } = require('shakapacker');

const customConfig = {
  options: {
    jsc: {
      // Preserve class names for Stimulus controller discovery
      keepClassNames: true,
      // Use spec-compliant transforms (override Shakapacker's loose: true default)
      // This is required for Stimulus controllers to work correctly
      loose: false,
      transform: {
        react: {
          // Use automatic runtime (React 17+) - no need to import React
          runtime: 'automatic',
          // Enable better dev error messages (like Babel's development mode)
          development: env.isDevelopment,
          // Enable React Fast Refresh in development
          refresh: env.isDevelopment && env.runningWebpackDevServer,
        },
      },
    },
  },
};

module.exports = customConfig;
