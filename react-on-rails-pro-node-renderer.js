const path = require('path');
const { reactOnRailsProNodeRenderer } = require('react-on-rails-pro-node-renderer');

const isProduction = process.env.NODE_ENV === 'production';
const rendererPassword = process.env.RENDERER_PASSWORD || (!isProduction && 'local-dev-renderer-password');

if (!rendererPassword) {
  throw new Error('RENDERER_PASSWORD must be set in production');
}

const config = {
  serverBundleCachePath: path.resolve(__dirname, '.node-renderer-bundles'),
  logLevel: process.env.RENDERER_LOG_LEVEL || 'debug',
  password: rendererPassword,
  port: process.env.RENDERER_PORT || 3800,
  supportModules: true,
  workersCount: Number(process.env.NODE_RENDERER_CONCURRENCY || 3),
};

if (process.env.CI) {
  config.workersCount = 2;
}

reactOnRailsProNodeRenderer(config);
