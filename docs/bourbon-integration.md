## Bourbon integration

To use [bourbon](https://github.com/thoughtbot/bourbon) take the following steps:

- Install node-bourbon `cd client && npm install --save node-bourbon`
- Update [bootstrap-sass.js](https://github.com/shakacode/react-webpack-rails-tutorial/blob/master/client/bootstrap-sass.config.js) to use the right paths:
```
// Add this
var bourbonPaths = require('node-bourbon').includePaths;
module.exports = {
  // ...
  // And update this
  styleLoader: 'style-loader!css-loader!sass-loader?imagePath=/assets/images&includePaths[]=' + bourbonPaths,
```
- `@import 'bourbon';` Import bourbon from your [scss file](https://github.com/shakacode/react-webpack-rails-tutorial/blob/master/client/assets/stylesheets/_app-styling-post-bootstrap-loading.scss)

