// This test verifies that SWC preserves class names for Stimulus controller discovery
// The keepClassNames: true setting in swc.config.js is critical for this to work

describe('Stimulus Controller Class Names', () => {
  it('verifies SWC config has keepClassNames enabled', () => {
    const swcConfig = require('../../../config/swc.config.js');

    // Verify that keepClassNames is set to true
    expect(swcConfig.options.jsc.keepClassNames).toBe(true);

    // Verify that loose mode is disabled (required for Stimulus)
    expect(swcConfig.options.jsc.loose).toBe(false);
  });

  it('verifies React transform has automatic runtime', () => {
    const swcConfig = require('../../../config/swc.config.js');

    // Verify React 19 compatibility with automatic runtime
    expect(swcConfig.options.jsc.transform.react.runtime).toBe('automatic');
  });
});
