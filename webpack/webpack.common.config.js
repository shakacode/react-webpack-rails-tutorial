// Common webpack configuration used by webpack.hot.config and webpack.bundle.config.

var path = require("path");

module.exports = {
  context: __dirname, // the project dir
  entry: [ "./assets/javascripts/example" ],
  // In case you wanted to load jQuery from the CDN, this is how you would do it:
  // externals: {
  //   jquery: "var jQuery"
  // },
  resolve: {
    root: [path.join(__dirname, "scripts"),
           path.join(__dirname, "assets/javascripts"),
           path.join(__dirname, "assets/stylesheets")],
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", ".scss", ".css", "config.js"]
  },
  module: {
    loaders: [
      { test: require.resolve("react"), loader: "expose?React" },
      { test: /\.jsx$/, loaders: ["react-hot", "es6", "jsx?harmony"] },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded&imagePath=/assets/images"},

      // The url-loader uses DataUrls. The file-loader emits files.
      { test: /\.woff$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" }
    ]
  }
};
