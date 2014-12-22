# React, React-Bootstrap, and ES-6 on Rails via WebPack

By Justin Gordon, http://www.railsonmaui.com

Full tutorial can be found at: [Fast Rich Client Rails Development With Webpack and the ES6 Transpiler](http://www.railsonmaui.com/blog/2014/10/02/integrating-webpack-and-the-es6-transpiler-into-an-existing-rails-project/)

[Discussion forum regarding the tutorial](http://forum.railsonmaui.com/t/fast-rich-client-rails-development-with-webpack-and-the-es6-transpiler/82/10)

# Motivation

In no particular order:
- Enable development of a JS client independently from Rails.
- Easily enable use of npm modules with a Rails application.
- Easily enable retrofitting such a JS framework into an existing Rails app.
- Enable the use of the JavaScript ES6 transpiler.

# Technologies involved

1. React 0.11 (for front-end app)
2. React-bootstrap 0.12
3. Webpack with hot-reload 1.4 (for local dev)
4. ES6 transpiler (es6-loader) 0.2
5. Rails 4.2 (for backend app)
6. Heroku (for deployment)

# Javascript development without Rails using Hot Module Replacement (HMR)

Setup node and run the node server.

```
npm install
cd webpack && node server.js
```

Point your browser to [http://0.0.0.0:3000]().


Save a change to a JSX file and see it update immediately in the browser! Note,
any browser state still exists, such as what you've typed in the comments box.
That's totally different than [Live Reload](http://livereload.com/) which refreshes
the browser.

# Rails integration

## Build JS/CSS bundles
Run this command to have webpack build the JS/CSS bundles and have them saved in the Rails
asset pipeline (app/assets).
Although not shown in this tutorial, the Webpack ExtractTextPlugin can optionally be used
to extract the CSS out of the JS bundle.

The following bundles are generated:
- webpack-bundle.js which gets saved to app/assets/javascripts
- bootstrap-and-customizations.css which gets saved in app/assets/stylesheets

Observe how the bundles are automatically re-generated whenever your JSX changes.

```
cd webpack
webpack -w --config webpack.rails.config.js
```

Make sure to invoke your local copy of the webpack executable as opposed
to any globally installed webpack.
See https://github.com/webpack/extract-text-webpack-plugin/blob/master/example/webpack.config.js

If in doubt, run the following command, which ensures that your local webpack copy
gets picked:
```
$(npm bin)/webpack -w --config webpack.rails.config.js
```

## Run Rails server

Once the JS/CSS bundles have been generated into the Rails asset pipeline, you can start
the Rails server.

```
cd <rails_project_name>
bundle install --without production
rake db:setup
rails s -p 4000
```

Now point your browser to [http://0.0.0.0:4000]().

Note that it's important to run the Rails server on a different port than the node server.

# Webpack configuration
- `webpack.hot.config.js`: Used by server.js to run the demo HMR server.
- `webpack.rails.config.js`: Used to generate the Rails bundles.
- `webpack.common.config.js`: Common configuration file to minimize code duplication
between the HMR and Rails configurations.

# Bootstrap integration
Notice that Bootstrap Sass is installed as both a gem and an npm package.
When running the Rails app, the bootstrap-sass gem assets are loaded directly
through the asset pipeline without passing through Webpack.
See app/assets/application.css.scss.
On the other hand when running the Webpack dev server, the bootrap-sass npm
assets are loaded through Webpack (with help of the bootstrap-sass-loader).
See webpack/webpack.hot.config.js.


Bootstrap can be customized by hand-picking which modules to load and/or overwriting
some of the Sass variables defined by the frameworks.

## Bootstrap modules customization

If you are not using all the Bootstrap modules then you'll likely want to customize
it to avoid loading unused assets. This customization is done in separate files
for the Rails app versus the Webpack dev server so it's important to keep these
in-sync as you develop your app in parallel using the Rails and the Webpack HMR
environments.

- Rails Bootstrap customization file: app/assets/stylesheets/_bootstrap-custom.scss
- Webpack HMR Bootstrap customization file: webpack/bootstrap-sass.config.js

## Bootstrap variables customization

If you need to customize some of the Sass variables defined in Bootstrap you
can do so by overwriting these variables in a separate file and have it loaded
before other Bootstrap modules.

To avoid duplicating this customization between Rails and Webpack HMR,
this custom code has been consolidated under Webpack in
webpack/assets/stylesheets/_bootstrap-variables-customization.scss and the
webpack/assets/stylesheets directory added to the Rails asset pipeline
search path. See config config/application.rb. Keep that in mind as you
customize the Bootstrap Sass variables.

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

In order to deploy to heroku, you'll need to run this command once to set a custom
buildpack:

```
heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
```

This runs the two buildpacks in the `.buildpacks` directory.
