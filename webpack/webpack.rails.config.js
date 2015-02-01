// Run like this:
// cd webpack && $(npm bin)/webpack -w --config webpack.rails.config.js
// Note that Foreman (Procfile.dev) has also been configured to take care of this.

var config = require("./webpack.common.config");

config.entry.push("./scripts/rails_only"); // rails specific assets
config.output = { filename: "webpack-bundle.js",
                  path: "../app/assets/javascripts" };
config.externals = { jquery: "var jQuery" }; // load jQuery from cdn or rails asset pipeline
config.module.loaders.push(
  { test: /\.jsx$/, loaders: ["es6", "jsx?harmony"] },
  { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded&imagePath=/assets/images"},
  // Next 2 lines expose jQuery and $ to any JavaScript files loaded after webpack-bundle.js
  // in the Rails Asset Pipeline. Thus, load this one prior.
  { test: require.resolve("jquery"), loader: "expose?jQuery" },
  { test: require.resolve("jquery"), loader: "expose?$" }
);

var devBuild = (typeof process.env["BUILDPACK_URL"]) === "undefined";
if (devBuild) {
  console.log("Webpack dev build for Rails");
  config.module.loaders.push(
    { test: /\.jsx$/, loaders: ["react-hot", "es6", "jsx?harmony"] }
  );
  config.devtool = "eval-source-map";
} else {
  console.log("Webpack production build for Rails");
  config.module.loaders.push(
    { test: /\.jsx$/, loaders: ["es6", "jsx?harmony"] }
  );
}

module.exports = config;
