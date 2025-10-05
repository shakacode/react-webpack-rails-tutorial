// config/swc.config.js
// This file is merged with Shakapacker's default SWC configuration
// See: https://swc.rs/docs/configuration/compilation

module.exports = {
  jsc: {
    parser: {
      syntax: "ecmascript",
      jsx: true,
      dynamicImport: true,
      decorators: false
    },
    transform: {
      react: {
        runtime: "automatic"
      },
      // Disable optimizer to preserve class structure for Stimulus
      optimizer: {
        globals: {
          vars: {}
        }
      }
    },
    // Critical for Stimulus: preserve class names and method bindings
    keepClassNames: true,
    // Use spec-compliant class transforms (not loose mode)
    loose: false,
    // Don't use external helpers
    externalHelpers: false,
    // Target ES2022 to avoid transforming class features
    target: "es2022"
  },
  // Preserve ES6 module semantics
  module: {
    type: "es6"
  }
};
