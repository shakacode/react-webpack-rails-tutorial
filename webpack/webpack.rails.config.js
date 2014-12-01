// Run like this:
// cd webpack && $(npm bin)/webpack -w --config webpack.hot.config.js

var config = require("./webpack.common.config");

config.entry.push("./scripts/rails_only"); // rails specific assets
config.output = { filename: "rails-bundle.js",
                  path: "../app/assets/javascripts" };
config.externals = { jquery: "var jQuery" }; // load jQuery from cdn or rails asset pipeline
config.module.loaders.push(
  { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded&imagePath=/assets/images"},
  // Next 2 lines expose jQuery and $ to any JavaScript files loaded after rails-bundle.js
  // in the Rails Asset Pipeline. Thus, load this one prior.
  { test: require.resolve("jquery"), loader: "expose?jQuery" },
  { test: require.resolve("jquery"), loader: "expose?$" }
);
module.exports = config;

var devBuild = (typeof process.env["BUILDPACK_URL"]) === "undefined";
if (devBuild) {
  console.log("Webpack dev build for Rails");
  //module.exports.devtool = "eval-source-map";
} else {
  console.log("Webpack production build for Rails");
}
