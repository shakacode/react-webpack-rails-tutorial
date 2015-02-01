// Run like this:
// cd webpack && node server.js

var config = require("./webpack.common.config");
var webpack = require("webpack");

// We're using the bootstrap-sass loader.
// See: https://github.com/justin808/bootstrap-sass-loader
config.entry.push("webpack-dev-server/client?http://localhost:3000",
                  "webpack/hot/dev-server",
                  "./scripts/webpack_only",
                  "bootstrap-sass!./bootstrap-sass.config.js"); // custom bootstrap
config.output = { filename: "express-bundle.js", // this file is served directly by webpack
                  path: __dirname };
config.module.loaders.push(
  { test: require.resolve("react"), loader: "expose?React" },
  { test: /\.jsx$/, loaders: ["react-hot", "es6", "jsx?harmony"] }
);
config.plugins = [ new webpack.HotModuleReplacementPlugin() ];
config.devtool = "eval-source-map";
module.exports = config;
