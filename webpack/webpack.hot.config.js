console.log("__dirname is " + __dirname);
var webpack = require("webpack");
var path = require("path");
module.exports = {
  devtool: "source-map",

  context: __dirname, //  + "/../app/assets/javascripts",
  entry: [
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/dev-server",
    "./scripts/webpack_only",
    "./assets/javascripts/example"
  ],
  // Note, this file is not actually saved, but used by the express server
  output: {
    filename: "express-bundle.js",
    path: __dirname
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  // Let's load jQuery from the CDN
  externals: {
    jquery: "var jQuery"
  },
  resolve: {
    root: [ path.join(__dirname, "scripts"), path.join(__dirname, "assets/javascripts"),
            path.join(__dirname, "assets/stylesheets") ],
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", ".scss", ".css", "config.js"]
  },
  resolveLoader: {
    root: [ __dirname + "./assets/javascripts"],
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
  },
  module: {
    loaders: [
      { test: require.resolve("react"), loader: "expose?React" },
      { test: /\.jsx$/, loaders: ["react-hot", "es6", "jsx?harmony"] },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded&imagePath=/assets/images"}
    ]
  }
};
