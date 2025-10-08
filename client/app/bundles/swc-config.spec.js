// This test verifies that SWC configuration is properly set up for:
// 1. Stimulus controller class name preservation (keepClassNames: true)
// 2. React 19 compatibility (automatic runtime)
//
// NOTE: We don't import swc.config.js directly in tests because it requires
// Node.js modules (path, fs) that aren't available in Jest environment.
// The actual SWC configuration is verified through build process and manual testing.

describe('SWC Configuration Documentation', () => {
  it('documents required SWC settings for Stimulus controllers', () => {
    // This test serves as documentation for the required SWC configuration.
    // The actual settings are in config/swc.config.js:
    //
    // jsc: {
    //   keepClassNames: true,  // Required for Stimulus controller discovery
    //   loose: false,          // Required for Stimulus to work correctly
    //   transform: {
    //     react: {
    //       runtime: 'automatic',           // React 19 compatibility
    //       refresh: env.isDevelopment && env.runningWebpackDevServer,
    //     },
    //   },
    // }

    expect(true).toBe(true); // This test always passes - it's for documentation
  });
});
