# React, React-Bootstrap, and ES-6 on Rails via WebPack

By Justin Gordon, http://www.railsonmaui.com

Full tutorial can be found at: [Fast Rich Client Rails Development With Webpack and the ES6 Transpiler](http://www.railsonmaui.com/blog/2014/10/02/integrating-webpack-and-the-es6-transpiler-into-an-existing-rails-project/)

[Discussion forum regarding the tutorial](http://forum.railsonmaui.com/t/fast-rich-client-rails-development-with-webpack-and-the-es6-transpiler/82/10)

# Motivation

1. Enable development of a JS client separate from Rails.
2. Enable easily retrofitting such a JS framework into an existing Rails app.
3. Enable the use of the JavaScript es6 transpiler.
4. Enable easily using npm modules with a Rails application.

# Example of the following technologies

1. React
2. React-bootstrap
3. Webpack with hot-reload
4. Webpack ExtractTextPlugin
4. es6-loader (es6 transpiler)
5. Simultaneously working with Rails 4.2
6. Deployable to Heroku

# Running without Rails using Module Hot Replacement

Setup node and run the node server.

```
npm install
cd webpack && webpack --config webpack.hot.config.js
node server.js
```

Point browser to [http://0.0.0.0:3000]().

Make sure to invoke your local copy of the webpack executable as opposed
to any globally installed webpack.
See https://github.com/webpack/extract-text-webpack-plugin/blob/master/example/webpack.config.js
In doubt you can run the following command:
```
$(npm bin)/webpack --config webpack.hot.config.js
```

Save a change to a JSX file and see it update immediately in the browser! Note,
any browser state still exists, such as what you've typed in the comments box.
That's totally different than "Live Reload" which refreshes the browser.

# Running with Rails

## Build Rails bundles
Run this command to have webpack build the Rails bundles in the Rails
asset pipeline.
Note that the Webpack ExtractTextPlugin is used so that two bundles are generated:
- rails-bundle.js which gets copied to app/assets/javascripts
- bootstrap-and-customizations.css which gets copied in app/assets/stylesheet
Observe how the bundles are automatically re-generated whever your JSX changes.

```
cd webpack
webpack -w --config webpack.rails.config.js
```

## Run Rails server

```
cd <rails_project_name>
bundle install
rake db:setup
rails s -p 4000
```
Point browser to [http://0.0.0.0:4000]().

It's important to run the rails server on different port than the node server.

# Webpack configuration files
- `webpack.hot.config.js`: Used by server.js to run the demo express server.
- `webpack.rails.config.js`: Used to generate the Rails bundles.
- `webpack.common.config.js`: Common configuration file to minimize code duplication.

# Notes on Rails assets
## Javascript
The `webpack.rails.config.js` file generates rails-bundle.js which is then included
by the Rails asset pipeline.

## Sass and images
1. The Webpack server loads the images from the **symlink** of the
   app/assets/images directory.
2. Since the images are not moved, Rails loads images via the normal asset
   pipeline features.
3. The `image-url` sass helper takes care of mapping the correct directories for
   images. The image directory for the webpack server is configured by this
   line:

```
    { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded&imagePath=/assets/images"}
```

# Process management
Run the following command in your development environment to invoke both Webpack and Rails.
```
bundle exec foreman start -f Procfile.dev
```

# Source Maps
They work for both Rails and the Webpack Server!

# Deploying to Heroku

In order to deploy to heroku, you'll need run this command once to set a custom
buildpack:

```
heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
```

This runs the two buildpacks in the `.buildpacks` directory.
