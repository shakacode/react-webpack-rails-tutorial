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
      }
    },
    // Critical for Stimulus: preserve class names and use spec-compliant transforms
    keepClassNames: true,
    // Use spec-compliant class transforms (not loose mode)
    loose: false,
    // Don't use external helpers to avoid any potential binding issues
    externalHelpers: false,
    target: "es2015"
  },
  // Preserve original semantics for class fields/methods
  module: {
    type: "es6"
  }
};
