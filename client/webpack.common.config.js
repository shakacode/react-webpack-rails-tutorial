// Common webpack configuration used by webpack.hot.config and webpack.rails.config.

var path = require("path");

module.exports = {
  context: __dirname, // the project dir
  entry: [ "./assets/javascripts/App" ],
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
    loaders: []
  }
};
