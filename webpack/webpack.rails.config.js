// Run like this
// cd webpack && webpack -w --config webpack.rails.config.js

var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var railsBundleFile = "rails-bundle.js";
var railsJsAssetsDir = "../app/assets/javascripts";
//var railsBundleMapFile = railsBundleFile + ".map";
//var railsBundleMapRelativePath = "../../../public/assets/" + railsBundleMapFile;

module.exports = {
  context: __dirname,
  entry: [
    //"./scripts/rails_only", // uncomment to expose Rails specific
    "./assets/javascripts/example",

    //'bootstrap-sass-loader' // include all bootstrap
    //'bootstrap-sass!./bootstrap-sass.config.js' // use custom bootstrap file
    'bootstrap-sass!./bootstrap-sass.extract-text-plugin.config.js' // use custom bootstrap file w/ ExtractTextPlugin
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
  module: {
    loaders: [
      // **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-sass-loader has access to the jQuery object
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
      { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded&imagePath=/assets/images"},
      // Load Bootstrap's CSS
      // Needed for the css-loader when [bootstrap-sass-loader]
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" },
      //{ test: /\.woff$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
      //{ test: /\.ttf$/,    loader: "file-loader" },
      //{ test: /\.eot$/,    loader: "file-loader" },
      //{ test: /\.svg$/,    loader: "file-loader" },

      { test: /\.jsx$/, loaders: ['es6', 'jsx?harmony'] },
      // Next 2 lines expose jQuery and $ to any JavaScript files loaded after rails-bundle.js
      // in the Rails Asset Pipeline. Thus, load this one prior.
      { test: require.resolve("jquery"), loader: "expose?jQuery" },
      { test: require.resolve("jquery"), loader: "expose?$" }
    ]
  },
  plugins: [
    new ExtractTextPlugin("../stylesheets/bootstrap-and-customizations.css")
  ]
};

var devBuild = (typeof process.env["BUILDPACK_URL"]) === "undefined";
if (devBuild) {
  console.log("Webpack dev build for rails");
  module.exports.devtool = "eval-source-map";
  module.exports.module.loaders.push(
    { test: require.resolve("react"), loader: "expose?React" }
  );
} else {
  console.log("Webpack production build for rails");
}
