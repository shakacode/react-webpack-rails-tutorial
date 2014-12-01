// Run like this:
// cd webpack && $(npm bin)/webpack -w --config webpack.hot.config.js
// or:
// cd webpack && node server.js

var config = require("./webpack.common.config");
var webpack = require("webpack");
//var ExtractTextPlugin = require("extract-text-webpack-plugin");

// Add the following entries as appropriate:
// "bootstrap-sass-loader" -> all bootstrap assets
// "bootstrap-sass!./bootstrap-sass.config.js" -> custom bootstrap
// "bootstrap-sass!./bootstrap-sass.extract-text.config.js" -> custom bootstrap w/ ExtractTextPlugin
config.entry.push("webpack-dev-server/client?http://localhost:3000",
                  "webpack/hot/dev-server",
                  "./scripts/webpack_only",
                  "bootstrap-sass!./bootstrap-sass.config.js");
                  //"bootstrap-sass!./bootstrap-sass.extract-text.config.js");
config.output = { filename: "express-bundle.js", // this file is served directly by webpack
                  path: __dirname };
//config.module.loaders.push(
//  { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
//);
config.plugins = [ new webpack.HotModuleReplacementPlugin() ];
                   //new ExtractTextPlugin("bootstrap-and-customizations.css") ];
module.exports = config;
