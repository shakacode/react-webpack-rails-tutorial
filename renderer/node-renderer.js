const path = require('path');
const { reactOnRailsProNodeRenderer } = require('react-on-rails-pro-node-renderer');

const isProduction = process.env.NODE_ENV === 'production';
const rendererPassword = process.env.RENDERER_PASSWORD || (!isProduction && 'local-dev-renderer-password');

if (!rendererPassword) {
  throw new Error('RENDERER_PASSWORD must be set in production');
}

function parseIntegerEnv(name, defaultValue, { min, max = Number.MAX_SAFE_INTEGER }) {
  const rawValue = process.env[name];
  if (rawValue == null || rawValue.trim() === '') {
    return defaultValue;
  }

  const normalized = rawValue.trim();
  if (!/^\d+$/.test(normalized)) {
    throw new Error(`Invalid ${name}: "${rawValue}". Expected an integer.`);
  }

  const parsed = Number.parseInt(normalized, 10);
  if (parsed < min || parsed > max) {
    throw new Error(`Invalid ${name}: "${rawValue}". Expected a value between ${min} and ${max}.`);
  }

  return parsed;
}

const config = {
  serverBundleCachePath: path.resolve(__dirname, '.node-renderer-bundles'),
  logLevel: process.env.RENDERER_LOG_LEVEL || 'info',
  password: rendererPassword,
  port: parseIntegerEnv('RENDERER_PORT', 3800, { min: 1, max: 65535 }),
  supportModules: true,
  workersCount: parseIntegerEnv('NODE_RENDERER_CONCURRENCY', 3, { min: 0 }),
  // Expose globals the VM sandbox doesn't auto-provide but that downstream
  // deps rely on during SSR. Without URL, react-router-dom's NavLink throws
  // `ReferenceError: URL is not defined` via encodeLocation.
  additionalContext: { URL, AbortController },
};

// CI hosts report more CPUs than allocated to the container; cap workers to
// avoid oversubscribing memory.
if (process.env.CI && process.env.NODE_RENDERER_CONCURRENCY == null) {
  config.workersCount = 2;
}

reactOnRailsProNodeRenderer(config);
