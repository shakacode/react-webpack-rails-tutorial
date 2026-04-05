const path = require('path');
const { reactOnRailsProNodeRenderer } = require('react-on-rails-pro-node-renderer');

const config = {
  serverBundleCachePath: path.resolve(__dirname, '.node-renderer-bundles'),
  logLevel: process.env.RENDERER_LOG_LEVEL || 'debug',
  password: process.env.RENDERER_PASSWORD || 'devPassword',
  port: process.env.RENDERER_PORT || 3800,
  supportModules: true,
  workersCount: Number(process.env.NODE_RENDERER_CONCURRENCY || 3),
};

if (process.env.CI) {
  config.workersCount = 2;
}

reactOnRailsProNodeRenderer(config);
