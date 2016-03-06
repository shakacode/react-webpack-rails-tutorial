# jQuery with Rails and Webpack

jQuery and jQuery-ujs are not required within `app/assets/javascript/application.js` and have been moved under`/client` and are managed by npm. The modules are exposed via entry point by [client/webpack.client.base.config.js](client/webpack.client.base.config.js) and, for `jquery-ujs`, in the [client/webpack.client.rails.build.config.js](client/webpack.client.rails.build.config.js) and the [client/webpack.client.rails.hot.config.js](client/webpack.client.rails.hot.config.js).

In `application_non_webpack.js` and `application_static.js.erb`, it's critical that any libraries that depend on jQuery come after the inclusion
of the Webpack bundle.

Please refer to [Considerations for jQuery with Rails and Webpack](http://forum.shakacode.com/t/considerations-for-jquery-with-rails-and-webpack/344) for further info.
