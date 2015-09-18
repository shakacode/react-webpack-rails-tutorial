[![Codeship Status for justin808/react-webpack-rails-tutorial](https://codeship.com/projects/287b26d0-0c05-0133-7a33-02e67aca5f06/status?branch=master)](https://codeship.com/projects/90975)
[![Build Status](https://travis-ci.org/shakacode/react-webpack-rails-tutorial.svg?branch=code_coverage-linting)](https://travis-ci.org/shakacode/react-webpack-rails-tutorial)
[![Coverage Status](https://coveralls.io/repos/shakacode/react-webpack-rails-tutorial/badge.svg?branch=master&service=github)](https://coveralls.io/github/shakacode/react-webpack-rails-tutorial?branch=master)
[![Dependency Status](https://gemnasium.com/shakacode/react-webpack-rails-tutorial.svg)](https://gemnasium.com/shakacode/react-webpack-rails-tutorial)
# React, Redux, React-Bootstrap, and ES-7 on Rails via WebPack and the react_on_rails gem

## Now with Redux and ES7! Servering Rendering ASAP (Shaka Code's react_on_rails gem)!

By Justin Gordon and the Shaka Code Team, http://www.railsonmaui.com

- If you came to here from the blog article, this example project has evolved.
  See [pull requests](https://github.com/shakacode/react-webpack-rails-tutorial/pulls?utf8=%E2%9C%93&q=is%3Apr).
- If this work interests you and you are looking for full or part-time remote work, please
  [click here](http://forum.railsonmaui.com/t/railsonmaui-is-hiring-and-partnering-part-time-remote-is-ok/156).
- Please email us at [justin@shakacode.com](mailto:justin@shakacode.com) if you have a ReactJs +
  Rails project and are interested in help from our experienced team.
- Please file issues for problems and feature requests.
- Pull requests are welcome! (and a great way to get on the team)
- Feel free to open discussions at [forum.railsonmaui.com](http://forum.railsonmaui.com).
- We now have a [gitter chat room for this topic](https://gitter.im/shakacode/react-webpack-rails-tutorial).
- Check out the [react_on_rails gem](https://github.com/shakacode/react_on_rails) for easy webpack integration.

A Full tutorial article can be found at: [Fast Rich Client Rails Development With Webpack and the ES6 Transpiler](http://www.railsonmaui.com/blog/2014/10/03/integrating-webpack-and-the-es6-transpiler-into-an-existing-rails-project/)

Note, this source code repository is way ahead of the tutorial. We plan to update the tutorial as soon as can catch our breath!

[Discussion forum regarding the tutorial](http://forum.railsonmaui.com/t/fast-rich-client-rails-development-with-webpack-and-the-es6-transpiler/82/10)

# Example Application
This is a simple example application that illustrates the use of ReactJs to implement a commenting
system. Front-end code leverages both ReactJs and Rails asset pipeline while the backend is 100% Rails.
It shows off a little bit of the interactivity of a ReactJs application, allowing the commmenter to
choose the form layout. `react-bootstrap` is used for the React components.

A pure Rails UI generated from scaffolding is shown for comparison.

You can see this tutorial live here: [http://reactrails.com/](http://reactrails.com/)

# Motivation

In no particular order:

- Example of Rails 4.2 with ReactJs/Redux with Webpack and ES7.
- Enable development of a JS client independently from Rails using Webpack Hot Module Reload. You can see this by starting the app and visiting http://localhost:3000
- Easily enable use of npm modules with a Rails application.
- Easily enable retrofitting such a JS framework into an existing Rails app.
- Enable the use of the JavaScript ES7 transpiler.
- Example setting up Ruby and ES7 linting in a real project.
- Example of thorough use of Ruby and JavaScript linters, and other CI tasks.

# Technologies involved

See package.json and Gemfile for versions

1. [React](http://facebook.github.io/react/) (for front-end app)
2. [react-bootstrap](https://react-bootstrap.github.io/)
3. [Redux](https://github.com/rackt/redux)
4. [Webpack with hot-reload](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack) (for local dev)
5. Babel transpiler (https://github.com/babel/babel)
6. Rails 4.2 (for backend app)
7. Heroku (for deployment)

# Basic Setup
1. Be sure that you have Node installed. I use [nvm](https://github.com/creationix/nvm), with node
   version `v0.12.7`. See this article [Updating and using nvm](http://forum.railsonmaui.com/t/updating-and-using-nvm/293).
1. `git clone git@github.com:shakacode/react-webpack-rails-tutorial.git`
1. `cd react-webpack-rails-tutorial`
1. Check that you have Ruby 2.2.2
1. Check that you're using the right version of node. Run `nvm list` to check.
1. Check that you have Postgres installed. Run `which postgres` to check.
1. `bundle install`
1. `npm install`
1. `rake db:setup`
1. `foreman start -f Procfile.dev`
1. Open a browser tab to http://0.0.0.0:4000 for the Rail app example.
1. Open a browser tab to http://0.0.0.0:3000 for the Hot Module Replacement Example.

# Javascript development without Rails using Hot Module Replacement (HMR)

Setup node and run the node server with file `server.js`.

```
cd client
node server.js
```

Point your browser to http://0.0.0.0:3000.

Save a change to a JSX file and see it update immediately in the browser! Note,
any browser state still exists, such as what you've typed in the comments box.
That's totally different than [Live Reload](http://livereload.com/) which refreshes
the browser.

# Rails integration

## Build JS/CSS bundles

Run `webpack` to build the JS/CSS bundles and have them saved in the
Rails asset pipeline (app/assets). Although not shown in this tutorial, the
Webpack ExtractTextPlugin can optionally be used to extract the CSS out of
the JS bundle. We've chosen to let Rails handle CSS, SCSS, images, fonts.

```
cd client
npm run build:dev
```

`client-bundle.js` is generated and saved to `app/assets/javascripts`. This is included in the
Rails asset pipeline.

Observe how the bundles are automatically re-generated whenever your JSX changes.

## Run Rails server

Once the JS bundle has been generated into the Rails asset pipeline, you can start
the Rails server.

```
cd <rails_project_name>
rake db:setup
rails s -p 4000
```

Now point your browser to http://0.0.0.0:4000.

Note that it's important to run the Rails server on a different port than the node server.

# Webpack configuration
- `webpack.hot.config.js`: Used by server.js to run the demo HMR server.
- `webpack.rails.config.js`: Used to generate the Rails bundles.
- `webpack.common.config.js`: Common configuration file to minimize code duplication
between the HMR and Rails configurations.

# Bootstrap integration
Notice that Bootstrap Sass is installed as both a gem and an npm package.
When running the Rails app, the bootstrap-sass gem assets are loaded directly
through the asset pipeline without going through Webpack.

See `app/assets/application.css.scss`.

On the other hand when running the Webpack dev server, the bootrap-sass npm
assets are loaded through Webpack (with help of the bootstrap-sass-loader).
See `webpack/webpack.hot.config.js`.

Bootstrap can be customized by hand-picking which modules to load and/or overwriting
some of the Sass variables defined by the framework.

## Bootstrap modules customization

If you are not using all the Bootstrap modules then you'll likely want to customize
it to avoid loading unused assets. This customization is done in separate files
for the Rails app versus the Webpack dev server so it's important to keep these
in-sync as you develop your app in parallel using the Rails and the Webpack HMR
environments.

- Rails Bootstrap customization file: `app/assets/stylesheets/_bootstrap-custom.scss`
- Webpack HMR Bootstrap customization file: `webpack/bootstrap-sass.config.js`

## Bootstrap variables customization

If you need to customize some of the Sass variables defined in Bootstrap you
can do so by overwriting these variables in a separate file and have it loaded
before other Bootstrap modules.

To avoid duplicating this customization between Rails and Webpack HMR,
this custom code has been consolidated under Webpack in
`webpack/assets/stylesheets/_bootstrap-variables-customization.scss` and the
`webpack/assets/stylesheets` directory has been added to the Rails asset pipeline
search path. See config `config/application.rb`. Keep that in mind as you
customize the Bootstrap Sass variables.

# Notes on Rails assets
## Rails Asset Pipeline Magic
Be sure to see [assets.rake](https://github.com/shakacode/react-webpack-rails-tutorial/blob/master/lib/tasks/assets.rake) for how webpack is invoked during asset compilation.

## Javascript
The `webpack.rails.config.js` file generates client-bundle.js which is then included
by the Rails asset pipeline.

##jQuery with Rails and Webpack
jQuery and jQuery-ujs are not required within `app/assets/javascript/application.js`
and have been moved under`/client` and managed by npm. The modules are exposed via entry point
by `webpack.common.config.js`.

In `application.js`, it's critical that any libraries that depend on jQuery come after the inclusion
of the Webpack bundle, such as the twitter bootstrap javascript.

Please refer to [Considerations for jQuery with Rails and Webpack](http://forum.railsonmaui.com/t/considerations-for-jquery-with-rails-and-webpack/344) for further info.


## Sass and images
1. The Webpack server loads the images from the **symlink** of the
   `app/assets/images` directory.
2. Since the images are not moved, Rails loads images via the normal asset
   pipeline features.
3. The `image-url` sass helper takes care of mapping the correct directories for
   images. The image directory for the webpack server is configured by this
   line:

```
{ test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded&imagePath=/assets/images"}
```

## Sass and fonts
The tutorial makes use of a custom font OpenSans-Light. The font files are located
under `app/assets/font` and are loaded by both the Rails asset pipeline and
the Webpack HMR server. See the **symlink** under `webpack/assets/fonts` which
points to `app/assets/fonts`.

Note that the libsass C library, which is used by the Webpack sass-loader, does not
support the font-url() helper so we use url() instead. See the hack in
`webpack/assets/stylesheets/_bootstrap-variables-customization.scss`.

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

Also make sure you are running the latest heroku stack, cedar-14, to avoid running
into the [following issue](https://github.com/sass/node-sass/issues/467#issuecomment-61729195).

```
heroku stack:set cedar-14 -a react-webpack-rails-tutorial
```

To deploy the app on Heroku:
```
git push heroku master
```

# Running Tests
*Default rake task runs tests and linting*

We have feature tests in /spec/features

Run the tests with `rspec`.

# Linting and Code Inspection
## Running Lint and CI tasks
* Default rake task runs tests and linting (yes, repeating this!) (see `ci.rake`)
* See file [README.md](client/README.md) for how to run ESLint and JSCS
* See scripts `scripts/lint` and `client/bin/lint`.
* We're using the [AirBnb JavaScript style guidelines](https://github.com/airbnb/javascript).

### RubyMine/Webstorm Linting Configuration
  * I started out trying to make RubyMine and WebStorm catch and fix linting errors. However, I find
    it faster to just do this with the command line. Your mileage may vary.
  * Create a custom scope like this for RubyMine, named "Inspection Scope"

    file[react-rails-tutorial]:*/&&!file[react-rails-tutorial]:tmp//*&&!file[react-rails-tutorial]:log//*&&!file[react-rails-tutorial]:client/node_modules//*&&!file[react-rails-tutorial]:client/assets/fonts//*&&!file[react-rails-tutorial]:app/assets/fonts//*&&!file[react-rails-tutorial]:bin//*&&!file[react-rails-tutorial]:app/assets/javascripts//*

  * Install the code style and inspection files in [client/jetbrains](client/jetbrains)
  * Use the installed inspection settings and new Inspection Scope for code inspection.
  * RubyMine configuration is optional. All linters run from the command line.

## Linters
  1. [Rubocop](https://github.com/bbatsov/rubocop)
  2. [Ruby-Lint](https://github.com/YorickPeterse/ruby-lint)
  3. [Eslint](http://eslint.org/)
  4. [JSCS](https://github.com/jscs-dev/node-jscs)
  5. [scss-lint](https://github.com/brigade/scss-lint)
  6. [brakeman](http://brakemanscanner.org/)
  7. [bundle-audit](https://github.com/rubysec/bundler-audit)

# Contributors
* [Martin Breining](https://github.com/mbreining)
* [Dylan Grafmyre](https://github.com/Dgrafmyre)

# RubyMine and WebStorm
Special thanks to [JetBrains](https://www.jetbrains.com) for their great tools
[RubyMine](https://www.jetbrains.com/ruby/) and [WebStorm](https://www.jetbrains.com/webstorm/).
The developers of this project use RubyMine at the top level, mostly for Ruby work, and we use
WebStorm opened up to the `client` directory to focus on JSX and Sass files.

# Misc Tips

## Cleanup local branches merged to master
```
alias git-cleanup-merged-branches='git branch --merged master | grep -v master | xargs git branch -d'
```

# Open Code of Conduct
This project adheres to the [Open Code of Conduct](http://todogroup.org/opencodeofconduct/#fetch/opensource@github.com). By participating, you are expected to uphold this code.
