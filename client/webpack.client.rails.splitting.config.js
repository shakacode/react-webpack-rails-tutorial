// Webpack configuration for code splitting

const config = require('./webpack.client.rails.build.config');

// Add publicPath key to output so that webpack know where to fetch
// the code chunks from.
config.output.publicPath = "/assets/"

// Use the code splitting entry point
config.entry.app = [
  './app/bundles/comments/startup/clientRegistrationCodeSplitting'
];

exports.default = config;
