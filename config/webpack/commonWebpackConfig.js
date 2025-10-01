// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_tutorial_with_ssr_and_hmr_fast_refresh/blob/master/config/webpack/commonWebpackConfig.js

// Common configuration applying to client and server configuration
const { generateWebpackConfig, merge } = require('shakapacker');

const baseClientWebpackConfig = generateWebpackConfig();
const commonOptions = {
  resolve: {
    extensions: ['.css', '.ts', '.tsx'],
  },
};

// add sass resource loader
const sassLoaderConfig = {
  loader: 'sass-resources-loader',
  options: {
    resources: './client/app/assets/styles/app-variables.scss',
  },
};

const ignoreWarningsConfig = {
  ignoreWarnings: [/Module not found: Error: Can't resolve 'react-dom\/client'/],
};

const scssConfigIndex = baseClientWebpackConfig.module.rules.findIndex((config) =>
  '.scss'.match(config.test),
);

// Configure sass-loader to use the modern API
const scssRule = baseClientWebpackConfig.module.rules[scssConfigIndex];
const sassLoaderIndex = scssRule.use.findIndex((loader) => {
  if (typeof loader === 'string') {
    return loader.includes('sass-loader');
  }
  return loader.loader && loader.loader.includes('sass-loader');
});

if (sassLoaderIndex !== -1) {
  const sassLoader = scssRule.use[sassLoaderIndex];
  if (typeof sassLoader === 'string') {
    scssRule.use[sassLoaderIndex] = {
      loader: sassLoader,
      options: {
        api: 'modern',
        sassOptions: {
          includePaths: []
        }
      }
    };
  } else {
    sassLoader.options = sassLoader.options || {};
    sassLoader.options.api = 'modern';
  }
}

// Fix css-loader configuration for CSS modules
// When namedExport is true, exportLocalsConvention must be camelCaseOnly or dashesOnly
const cssLoaderIndex = scssRule.use.findIndex((loader) => {
  if (typeof loader === 'string') {
    return loader.includes('css-loader');
  }
  return loader.loader && loader.loader.includes('css-loader');
});

if (cssLoaderIndex !== -1) {
  const cssLoader = scssRule.use[cssLoaderIndex];
  if (typeof cssLoader === 'object' && cssLoader.options && cssLoader.options.modules) {
    // If namedExport is enabled, ensure exportLocalsConvention is properly set
    if (cssLoader.options.modules.namedExport) {
      cssLoader.options.modules.exportLocalsConvention = 'camelCaseOnly';
    }
  }
}

baseClientWebpackConfig.module.rules[scssConfigIndex].use.push(sassLoaderConfig);

// Copy the object using merge b/c the baseClientWebpackConfig and commonOptions are mutable globals
const commonWebpackConfig = () => merge({}, baseClientWebpackConfig, commonOptions, ignoreWarningsConfig);

module.exports = commonWebpackConfig;

