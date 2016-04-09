[![Codeship Status for justin808/react-webpack-rails-tutorial](https://codeship.com/projects/287b26d0-0c05-0133-7a33-02e67aca5f06/status?branch=master)](https://codeship.com/projects/90975)
[![Build Status](https://travis-ci.org/shakacode/react-webpack-rails-tutorial.svg?branch=code_coverage-linting)](https://travis-ci.org/shakacode/react-webpack-rails-tutorial) [![Dependency Status](https://gemnasium.com/shakacode/react-webpack-rails-tutorial.svg)](https://gemnasium.com/shakacode/react-webpack-rails-tutorial) [![Code Climate](https://codeclimate.com/github/shakacode/react-webpack-rails-tutorial/badges/gpa.svg)](https://codeclimate.com/github/shakacode/react-webpack-rails-tutorial) [![Coverage Status](https://coveralls.io/repos/shakacode/react-webpack-rails-tutorial/badge.svg?branch=master&service=github)](https://coveralls.io/github/shakacode/react-webpack-rails-tutorial?branch=master)

# React, Redux, React-Bootstrap, ES7, Webpack Rails
## Server Rendering via the react_on_rails gem

#### Live at [www.reactrails.com](http://www.reactrails.com/)

By Justin Gordon and the Shaka Code Team, [www.shakacode.com](http://www.shakacode.com)

- If this work interests you and you are looking for full or part-time remote work, please [click here](http://forum.shakacode.com/t/railsonmaui-is-hiring-and-partnering-part-time-remote-is-ok/156).
- [ShakaCode](http://www.shakacode.com) is doing Skype plus Slack/Github based coaching for "React on Rails". [Click here](http://www.shakacode.com/work/index.html) for more information.
- Please email us at [contact@shakacode.com](mailto:contact@shakacode.com) if you have a ReactJs + Rails project and are interested in help from our experienced team.
- Please file issues for problems and feature requests.
- Pull requests are welcome! (and a great way to get on the ShakaCode team)
- Feel free to open discussions at [forum.shakacode.com](http://forum.shakacode.com). We love to help!
- We now have a [gitter chat room for this topic](https://gitter.im/shakacode/react-webpack-rails-tutorial) but we prefer our Slack Channel ([email us](mailto:contact@shakacode.com) for an invite).
- Check out the [react_on_rails gem](https://github.com/shakacode/react_on_rails) for easy webpack integration.
- If you came to here from the blog article, this example project has evolved. See [merged pull requests](https://github.com/shakacode/react-webpack-rails-tutorial/pulls?utf8=%E2%9C%93&q=is%3Apr+is%3Amerged) and the [CHANGELOG.md](./CHANGELOG.md).

An outdated full tutorial article behind of the motivation of this system can be found at: [Fast Rich Client Rails Development With Webpack and the ES6 Transpiler](http://www.railsonmaui.com/blog/2014/10/03/integrating-webpack-and-the-es6-transpiler-into-an-existing-rails-project/). Note, this source code repository is way ahead of the tutorial. 

# NEWS
We have not yet updated the `react_on_rails` gem generators for the following tasks. We're looking for help to migrate this, if you're interested in contributing to the project. *The tutorial* refers to this repo. The following changes have resulted in lots of differences for the webpack files and visual assets:

1. NOTE: Any references to localhost:3000 *might* need to use 0.0.0.0:3000 until Puma fixes an issue regarding this.
1. **Handling of Sass and Bootstrap**: The tutorial uses CSS modules via Webpack. This is totally different than the older way of having Rails handle Sass/Bootstrap, and having NPM/Webpack handle the Webpack Dev Server. The tutorial now has NPM handle all visual assets. We are using this technique on a new app, and it's awesome!
2. **Hot Reloading with Rails**: The tutorial has different startup scripts than the generators. The dev mode has the WebapackDev server providing the JS and CSS assets to the tutorial. This means you get **HOT RELOADING** of your JS and CSS within your Rails app.

If you did generate a fresh app from React On Rails and want to move to CSS Modules, then see [PR 175: Babel 6 / CSS Modules / Rails hot reloading](https://github.com/shakacode/react-webpack-rails-tutorial/pull/175). Note, while there are probably fixes after this PR was accepted, this has the majority of the changes.

# Example Application
This is a simple example application that illustrates the use of ReactJs to implement a commenting system. Front-end code leverages both ReactJs and Rails asset pipeline while the backend is 100% Rails. It shows off a little bit of the interactivity of a ReactJs application, allowing the commmenter to choose the form layout. `react-bootstrap` is used for the React components. A pure Rails UI generated from scaffolding is shown for comparison.

You can see this tutorial live here: [http://reactrails.com/](http://reactrails.com/)

# Motivation

In no particular order:

- Example of using the [react_on_rails gem](https://github.com/shakacode/react_on_rails) for easy react/webpack integration with Rails.
- Example of React with [CSS Modules](http://glenmaddern.com/articles/css-modules) inside of Rails using Webpack as described in [Smarter CSS builds with Webpack](http://bensmithett.com/smarter-css-builds-with-webpack/).
- Example of enabling hot reloading of both JS and CSS (modules) from your Rails app in development mode. Change your code. Save. Browser updates without a refresh!
- Example of Rails 5 with ReactJs/Redux/React-Router with Webpack and ES7.
- Enabling development of a JS client independently from Rails using the [Webpack Dev Server](https://webpack.github.io/docs/webpack-dev-server.html). You can see this by starting the app and visiting http://localhost:4000
- Enabling the use of npm modules and [Babel](https://babeljs.io/) with a Rails application using [Webpack](https://webpack.github.io/).
- Easily enable retrofitting such a JS framework into an existing Rails app. You don't need a brand new single page app!
- Example setting up Ruby and JavaScript linting in a real project, with corresponding CI rake tasks.

# Technologies involved

See package.json and Gemfile for versions

1. [react_on_rails gem](https://github.com/shakacode/react_on_rails/)
1. [React](http://facebook.github.io/react/)
1. [react-bootstrap](https://react-bootstrap.github.io/)
1. [bootstrap-loader](https://www.npmjs.com/package/bootstrap-loader/)
1. [Redux](https://github.com/reactjs/redux)
1. [react-router](https://github.com/reactjs/react-router)
1. [react-router-redux](https://github.com/reactjs/react-router-redux)
1. [Webpack with hot-reload](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack) (for local dev)
1. [Babel transpiler](https://github.com/babel/babel)
1. [Ruby on Rails 5](http://rubyonrails.org/) for backend app and comparison with plain HTML
1. [Heroku for Rails 5 deployment](https://devcenter.heroku.com/articles/getting-started-with-rails5)
1. [Turbolinks 5](https://github.com/turbolinks/turbolinks)

# Basic Setup
1. Be sure that you have Node installed! We suggest [nvm](https://github.com/creationix/nvm), with node version `v5.0` or above. See this article [Updating and using nvm](http://forum.shakacode.com/t/updating-and-using-nvm/293).
1. `git clone git@github.com:shakacode/react-webpack-rails-tutorial.git`
1. `cd react-webpack-rails-tutorial`
1. Check that you have Ruby 2.3.0 or greater
1. Check that you're using the right version of node. Run `nvm list` to check. Use 5.5 or greater.
1. Check that you have Postgres installed. Run `which postgres` to check. Use 9.4 or greater.
1. Check that you have `qmake` installed. Run `which qmake` to check. If missing, follow these instructions: [Installing Qt and compiling capybara-webkit](https://github.com/thoughtbot/capybara-webkit/wiki/Installing-Qt-and-compiling-capybara-webkit)
1. `bundle install`
  1. If you get an error installing libv8 on OSX El Capitan, follow these instructions:  [Install therubyracer gem on OSX 10.11 El Capitan](http://stackoverflow.com/a/36388150/1009332) or [this one](http://stackoverflow.com/questions/33475709/install-therubyracer-gem-on-osx-10-11-el-capitan/33475710#33475710).
1. `npm install`
1. `rake db:setup`
1. `foreman start -f Procfile.hot`
  1. Open a browser tab to http://localhost:3000 for the Rails app example with HOT RELOADING
  2. Try Hot Reloading steps below! 
1.  `foreman start -f Procfile.express`
  1. Open a browser tab to http://localhost:4000 for the Hot Module Replacement Example just using an express server (no Rails involved). This is good for fast prototyping of React components. However, this setup is not as useful now that we have hot reloading working for Rails!
  2. Try Hot Reloading steps below! 
1. `foreman start -f Procfile.static`
  1. Open a browser tab to http://localhost:3000 for the Rails app example.
  2. When you make changes, you have to refresh the browser page.

## Hot Reloading Example: applies to both `Procfile.hot` and `Procfile.express`
1. With the browser open to any JSX file, such as [client/app/bundles/comments/components/CommentBox/CommentBox.jsx](client/app/bundles/comments/components/CommentBox/CommentBox.jsx) and you can change the JSX code, hit save, and you will see the screen update without refreshing the window. This applies to port 3000 and port 4000.
1. Try changing a `.scss` file, such as a color in [client/app/bundles/comments/components/CommentBox/CommentList/Comment/Comment.scss](client/app/bundles/comments/components/CommentBox/CommentList/Comment/Comment.scss). You can see port 3000 or 4000 update automatically.
1. Be sure to take a look at the different Procfiles in this directory, as described below.

# KEY COMMANDS
1. Run all linters and tests: `rake`
1. See all npm commands: `npm run`
1. Start all development processes: `foreman start -f Procfile.dev`
1. Start all Rails only development processes: `foreman start -f Procfile.rails`
1. Start development without Rails, using the Webpack Dev Server only: `npm start` (or `foreman start -f Procfile.express`)


# Javascript development without Rails using the Webpack Dev Server

1. Run the node server with file `server-express.js` with command `npm run` or `cd client && node server-express.js`.
2. Point your browser to [http://localhost:4000](http://localhost:4000)

Save a change to a JSX file and see it update immediately in the browser! Note, any browser state still exists, such as what you've typed in the comments box. That's totally different than [Live Reload](http://livereload.com/) which refreshes the browser. Note, we just got this working with your regular Rails server! See below for **Hot Loading**.

# Rails integration

## JS and CSS assets
We're now using Webpack for all Sass and JavaScript assets so we can do CSS Modules within Rails!

1. **Production Deployment**: See [assets.rake](lib/tasks/assets.rake) for we modify the Rails precompile task to deploy assets for production.
1. **Development Mode**: Two flavors: Hot reloading assets (JavaScript & CSS) and Static loading.
   1. **Hot Loading**: We modify the URL in [application.html.erb](app/views/layouts/application.html.erb) based on whether or not we're in production mode using the helpers `env_stylesheet_link_tag` and `env_javascript_include_tag`. *Development mode* uses the Webpack Dev server running on port 3500. Other modes (production/test) uses precompiled files. See `Procfile.hot`. `Procfile.dev` also starts this mode. Note, *you don't have to refresh a Rails web page to view changes to JavaScript or CSS*.
  2. **Static Loading**: This uses webpack to create physical files of the assets, both JavaScript and CSS. This is essentially what we had before we enabled *Hot Loading*. You have to *refresh* the page to see changes to JavaScript or CSS. See `Procfile.static`. It is important to note that tests will use the same statically generated files.
  3. Note, the following view helpers do the magic to make this work:
   ```erb
  <%= env_stylesheet_link_tag(static: 'application_static', hot: 'application_non_webpack', options: { media: 'all', 'data-turbolinks-track' => true })  %>
  <%= env_javascript_include_tag(hot: ['http://localhost:3500/vendor-bundle.js', 'http://localhost:3500/app-bundle.js']) %>
  <%= env_javascript_include_tag(static: 'application_static', hot: 'application_non_webpack', options: { 'data-turbolinks-track' => true }) %>
  ```


1. **Testing Mode**: When running tests, it is useful to run `foreman start -f Procfile.spec` in order to have webpack automatically recompile the static bundles. Rspec is configured to automatically check whether or not this process is running. If it is not, it will automatically rebuild the webpack bundle to ensure you are not running tests on stale client code. This is achieved via the `ReactOnRails::TestHelper.configure_rspec_to_compile_assets(config)`
line in the `rails_helper.rb` file. If you are using this project as an example and are not using RSpec, you may want to implement similar logic in your own project.

# Webpack configuration
## Config Files

- `webpack.client.base.config.js`: Common **client** configuration file to minimize code duplication for `webpack.client.rails.build.config`, `webpack.client.rails.hot.config`, `webpack.client.express.config`
- `webpack.client.express.config.js`: Webpack configuration for [client/server-express.js](client/server-express.js)
- `webpack.client.rails.build.config.js`: Client side js bundle for deployment and tests.
- `webpack.client.rails.hot.config.js`: Webpack Dev Server bundler for serving rails assets on port 3500, used by [client/server-rails-hot.js](client/server-rails-hot.js), for hot reloading JS and CSS within Rails.
- `webpack.server.rails.build.config.js`: Server side js bundle, used by server rendering.

## Webpack Resources
- [Webpack Docs](http://webpack.github.io/docs/)
- [Webpack Cookbook](https://christianalfoni.github.io/react-webpack-cookbook/)
- Good overview: [Pete Hunt's Webpack Howto](https://github.com/petehunt/webpack-howto)

# Sass, CSS Modules, and Twitter Bootstrap integration
We're using Webpack to handle Sass assets so that we can use CSS modules. The best way to understand how we're handling assets is to close follow this example. We'll be working on more docs soon. If you'd like to give us a hand, that's a great way to learn about this!

For example in [client/app/bundles/comments/components/CommentBox/CommentBox.jsx](client/app/bundles/comments/components/CommentBox/CommentBox.jsx), see how we use standard JavaScript import syntax to refer to class names that come from CSS modules:

```javascript
import css from './CommentBox.scss';

export default class CommentBox extends React.Component {
  render() {
    const { actions, data } = this.props;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
  }
}
```

## Sass and fonts
The tutorial makes use of a custom font OpenSans-Light. We're doing this to show how to add assets for the CSS processing. The font files are located under [client/app/assets/fonts](client/app/assets/fonts) and are loaded by both the Rails asset pipeline and the Webpack HMR server.

# Process management during development
```
bundle exec foreman start -f <Procfile>
```

1. [`Procfile.dev`](Procfile.dev): Starts the Webpack Dev Server and Rails with Hot Reloading.
2. [`Procfile.hot`](Procfile.hot): Starts the Rails server and the webpack server to provide hot reloading of assets, JavaScript and CSS.
3. [`Procfile.static`](Procfile.static): Starts the Rails server and generates static assets that are used for tests.
4. [`Procfile.express`](Procfile.express): Starts only the Webpack Dev Server.
5. [`Procfile.spec`](Procfile.spec): Starts webpack to create the static files for tests. **Good to know:** If you want to start `rails s` separately to debug in `pry`, then run `Procfile.spec` to generate the assets and run `rails s` in a separate console.
6. [`Procfile.static.trace`](Procfile.static.trace): Same as `Procfile.static` but prints tracing information useful for debugging server rendering.

In general, you want to avoid running more webpack watch processes than you need. The `Procfile.dev`, for example, runs both the express server (Webpack dev server) and the Rails hot assets reloading server.

## Contributors
[The Shaka Code team!](http://www.shakacode.com/about/), led by [Justin Gordon](https://github.com/justin808/), along with with many others. See [contributors.md](docs/contributors.md)

# Open Code of Conduct
This project adheres to the [Open Code of Conduct](http://todogroup.org/opencodeofconduct/#fetch/opensource@github.com). By participating, you are expected to uphold this code.

# RubyMine and WebStorm
Special thanks to [JetBrains](https://www.jetbrains.com) for their great tools: [RubyMine](https://www.jetbrains.com/ruby/) and [WebStorm](https://www.jetbrains.com/webstorm/). Some developers of this project use RubyMine at the top level, mostly for Ruby work, and we use WebStorm opened up to the `client` directory to focus on JSX and Sass files.

## About [ShakaCode](http://www.shakacode.com/)

We hope you read [Who Is ShakaCode](http://www.shakacode.com/2015/09/17/who-is-shaka-code.html) and [Success the ShakaCode Way!](http://www.shakacode.com/2015/11/26/success-the-shakacode-way.html)

Visit [our forums!](http://forum.shakacode.com). We've got a [category dedicated to react_on_rails](http://forum.shakacode.com/c/rails/reactonrails).

If you're looking for consulting on a project using React and Rails, email us at [contact@shakacode.com](mailto:contact@shakacode.com)! You can also join our slack room for some free advice. Email us for an invite.

We're looking for great developers that want to work with Rails + React with a super-run, remote-first, distributed, worldwide team, for our own products, client work, and open source. [More info here](http://www.shakacode.com/about/index.html#work-with-us).
