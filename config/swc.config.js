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
          // Use classic runtime for SSR compatibility with React on Rails
          // This ensures React is explicitly imported in each component file, which
          // provides better compatibility with server-side rendering in Rails.
          // Classic runtime is more explicit and works reliably across all React versions.
          // TODO: Consider switching to 'automatic' runtime when fully on React 19+
          runtime: 'classic',
          // Enable React Fast Refresh in development
          refresh: env.isDevelopment && env.runningWebpackDevServer,
        },
      },
    },
  },
};

module.exports = customConfig;
