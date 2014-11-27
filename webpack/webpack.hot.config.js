var config = require("./webpack.common.config");
var webpack = require("webpack");

config.entry.push("webpack-dev-server/client?http://localhost:3000",
                  "webpack/hot/dev-server",
                  "./scripts/webpack_only");
config.output = { filename: "express-bundle.js", // this file is never saved
                  path: __dirname };
config.plugins = [ new webpack.HotModuleReplacementPlugin() ];
module.exports = config;
