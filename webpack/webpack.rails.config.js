// Run like this
// cd webpack && webpack -w --config webpack.rails.config.js

var path = require("path");
var railsBundleFile = "rails-bundle.js";
var railsJsAssetsDir = "../app/assets/javascripts";
var railsBundleMapFile = railsBundleFile + ".map";
var railsBundleMapRelativePath = "../../../public/assets/" + railsBundleMapFile;

module.exports = {
  context: __dirname,
  entry: [
    // In case we don't require jQuery from CDN or asset pipeline
    "./scripts/rails_only",
    "./assets/javascripts/example"
  ],
  output: {
    filename: railsBundleFile,
    path: railsJsAssetsDir
  },
  // Let's load jQuery from the CDN or rails asset pipeline
  externals: {
    jquery: "var jQuery"
  },
  resolve: {
    root: [ path.join(__dirname, "scripts"), path.join(__dirname, "assets/javascripts")],
    extensions: ["", ".js", ".jsx"]
  },
  resolveLoader: {
    // todo -- see if this is necessary
    root: [path.join(__dirname, "scripts"), path.join(__dirname, "assets/javascripts")],
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
  },
  module: {
    loaders: [
      { test: /\.jsx$/,
        loaders: ['es6', 'jsx?harmony'] }
    ]
  },
};

var devBuild = (typeof process.env["BUILDPACK_URL"]) === "undefined";
if (devBuild) {
  console.log("Webpack dev build for rails");
  module.exports.devtool = "source-map";
  module.exports.module.loaders.push(
    { test: require.resolve("react"), loader: "expose?React" }
  );
  module.exports.plugins = [
    function () {
      this.plugin("emit", function (compilation, callback) {
        // CRITICAL: This must be a relative path from the railsJsAssetsDir (where gen file goes)
        var asset = compilation.assets[railsBundleMapFile];
        compilation.assets[railsBundleMapRelativePath] = asset;
        delete compilation.assets[railsBundleMapFile];
        callback();
      });
    }
  ];
} else {
  console.log("Webpack production build for rails");
}

