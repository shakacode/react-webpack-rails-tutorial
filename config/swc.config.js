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
          // Use classic runtime for better SSR compatibility with React on Rails
          runtime: 'classic',
          // Enable React Fast Refresh in development
          refresh: env.isDevelopment && env.runningWebpackDevServer,
        },
      },
    },
  },
};

module.exports = customConfig;
