// Common configuration applying to client and server configuration
const { generateWebpackConfig, merge } = require('shakapacker');

const baseClientRspackConfig = generateWebpackConfig();
const commonOptions = {
  resolve: {
    extensions: ['.css', '.ts', '.tsx', '.bs.js'],
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

const scssConfigIndex = baseClientRspackConfig.module.rules.findIndex((config) =>
  '.scss'.match(config.test) && config.use,
);

if (scssConfigIndex === -1) {
  console.warn('No SCSS rule with use array found in rspack config');
} else {
  // Configure sass-loader to use the modern API
  const scssRule = baseClientRspackConfig.module.rules[scssConfigIndex];
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
          api: 'modern'
        }
      };
    } else {
      sassLoader.options = sassLoader.options || {};
      sassLoader.options.api = 'modern';
    }
  }

  // Fix css-loader configuration for CSS modules if namedExport is enabled
  // When namedExport is true, exportLocalsConvention must be camelCaseOnly or dashesOnly
  const cssLoader = scssRule.use.find((loader) => {
    const loaderName = typeof loader === 'string' ? loader : loader?.loader;
    return loaderName?.includes('css-loader');
  });

  if (cssLoader?.options?.modules?.namedExport) {
    cssLoader.options.modules.exportLocalsConvention = 'camelCaseOnly';
  }

  baseClientRspackConfig.module.rules[scssConfigIndex].use.push(sassLoaderConfig);
}

// Copy the object using merge b/c the baseClientRspackConfig and commonOptions are mutable globals
const commonRspackConfig = () => merge({}, baseClientRspackConfig, commonOptions, ignoreWarningsConfig);

module.exports = commonRspackConfig;
