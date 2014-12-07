// Run like this:
// cd webpack && node server.js

var config = require("./webpack.common.config");
var webpack = require("webpack");

config.entry.push("webpack-dev-server/client?http://localhost:3000",
                  "webpack/hot/dev-server",
                  "./scripts/webpack_only",
                  "bootstrap-sass!./bootstrap-sass.config.js"); // custom bootstrap
                  //"bootstrap-sass-loader" -> all bootstrap assets
config.output = { filename: "express-bundle.js", // this file is served directly by webpack
                  path: __dirname };
config.plugins = [ new webpack.HotModuleReplacementPlugin() ];
config.devtool = "eval-source-map";
module.exports = config;
