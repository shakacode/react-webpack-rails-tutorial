// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_tutorial_with_ssr_and_hmr_fast_refresh/blob/master/config/webpack/commonWebpackConfig.js

// Common configuration applying to client and server configuration
const { generateWebpackConfig, merge } = require('shakapacker');

const commonOptions = {
  resolve: {
    // Add .bs.js extension for ReScript-compiled modules
    extensions: ['.css', '.ts', '.tsx', '.bs.js'],
  },
};

// Sass resource loader config - globally imports app variables
const sassLoaderConfig = {
  loader: 'sass-resources-loader',
  options: {
    resources: './client/app/assets/styles/app-variables.scss',
  },
};

const ignoreWarningsConfig = {
  // React 19 uses react-dom/client but not all deps have migrated yet
  ignoreWarnings: [/Module not found: Error: Can't resolve 'react-dom\/client'/],
};

/**
 * Generates the common webpack/rspack configuration used by both client and server bundles.
 *
 * IMPORTANT: This function calls generateWebpackConfig() fresh on each invocation, so mutations
 * to the returned config are safe and won't affect other builds. The config is regenerated
 * for each build (client, server, etc.).
 *
 * Key customizations:
 * - CSS Modules: Configured for default exports (namedExport: false) for backward compatibility
 * - Sass: Configured with modern API and global variable imports
 * - ReScript: Added .bs.js to resolve extensions
 *
 * @returns {Object} Webpack/Rspack configuration object (auto-detected based on shakapacker.yml)
 */
const commonWebpackConfig = () => {
  // Generate fresh config - safe to mutate since it's a new object each time
  const baseWebpackConfig = generateWebpackConfig();

  // Fix CSS Modules to use default exports for backward compatibility
  // Shakapacker 9 changed default to namedExport: true, breaking existing imports like:
  // import css from './file.module.scss'
  // This ensures css is an object with properties, not undefined
  baseWebpackConfig.module.rules.forEach((rule) => {
    if (rule.use && Array.isArray(rule.use)) {
      const cssLoader = rule.use.find((loader) => {
        const loaderName = typeof loader === 'string' ? loader : loader?.loader;
        return loaderName?.includes('css-loader');
      });

      if (cssLoader?.options?.modules) {
        cssLoader.options.modules.namedExport = false;
        cssLoader.options.modules.exportLocalsConvention = 'camelCase';
      }
    }
  });

  const scssConfigIndex = baseWebpackConfig.module.rules.findIndex((config) =>
    '.scss'.match(config.test) && config.use,
  );

  if (scssConfigIndex === -1) {
    console.warn('No SCSS rule with use array found in webpack config');
    // Not throwing error since config might work without SCSS
  } else {
    // Configure sass-loader to use the modern API
    const scssRule = baseWebpackConfig.module.rules[scssConfigIndex];
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

    baseWebpackConfig.module.rules[scssConfigIndex].use.push(sassLoaderConfig);
  }

  return merge({}, baseWebpackConfig, commonOptions, ignoreWarningsConfig);
};

module.exports = commonWebpackConfig;

