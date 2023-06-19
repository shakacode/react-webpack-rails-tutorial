const postcssPresetEnv = require('postcss-preset-env');

const config = {
  plugins: [
    require('autoprefixer'),
    postcssPresetEnv({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
  ],
};

module.exports = config;
