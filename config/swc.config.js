module.exports = {
  options: {
    jsc: {
      parser: {
        syntax: 'ecmascript',
        jsx: true,
        dynamicImport: true,
        decorators: false,
      },
      transform: {
        react: {
          runtime: 'automatic',
          development: process.env.NODE_ENV === 'development',
          refresh: process.env.WEBPACK_SERVE === 'true',
        },
      },
      loose: true,
    },
    module: {
      type: 'es6',
    },
    sourceMaps: true,
    // Use env instead of jsc.target (they're mutually exclusive)
    env: {
      targets: {
        browsers: ['>1%', 'last 5 versions', 'safari >= 7', 'Firefox ESR', 'not IE 11'],
      },
      coreJs: 3,
      mode: 'entry',
    },
  },
};
