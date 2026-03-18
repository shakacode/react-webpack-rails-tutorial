// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_tutorial_with_ssr_and_hmr_fast_refresh/blob/master/config/webpack/development.js

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const webpackConfig = require('./webpackConfig');

// Rspack HMR/refresh is handled by Shakapacker + @rspack/plugin-react-refresh.
module.exports = webpackConfig();
