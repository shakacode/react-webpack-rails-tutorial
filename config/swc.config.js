module.exports = {
  jsc: {
    transform: {
      react: {
        runtime: "automatic"
      }
    },
    // Preserve ES6 classes for Stimulus compatibility
    keepClassNames: true
  }
};
