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
  // CI hosts report more CPUs than allocated to the container; default to
  // 2 workers on CI to avoid oversubscribing memory. Explicit
  // RENDERER_WORKERS_COUNT still wins on either path.
  workersCount: parseIntegerEnv('RENDERER_WORKERS_COUNT', process.env.CI ? 2 : 3, { min: 0 }),
  // Expose globals the VM sandbox doesn't auto-provide but that downstream
  // deps rely on during SSR. Without URL, react-router-dom's NavLink throws
  // `ReferenceError: URL is not defined` via encodeLocation.
  additionalContext: { URL, AbortController },
  // RSC requires a real setTimeout. The renderer's default stubTimers:true
  // replaces setTimeout with a no-op to prevent legacy SSR from leaking
  // timers, but React's RSC server renderer uses setTimeout internally for
  // Flight-protocol yielding — with it stubbed, the RSC stream silently
  // emits zero chunks and hangs until the Fastify idle timeout fires.
  stubTimers: false,
};

reactOnRailsProNodeRenderer(config);
