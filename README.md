[![Codeship Build Status](https://codeship.com/projects/287b26d0-0c05-0133-7a33-02e67aca5f06/status?branch=master)](https://app.codeship.com/projects/90975) [![Build Status](https://travis-ci.org/shakacode/react-webpack-rails-tutorial.svg?branch=code_coverage-linting)](https://travis-ci.org/shakacode/react-webpack-rails-tutorial) [![Dependency Status](https://gemnasium.com/shakacode/react-webpack-rails-tutorial.svg)](https://gemnasium.com/shakacode/react-webpack-rails-tutorial) [![Code Climate](https://codeclimate.com/github/shakacode/react-webpack-rails-tutorial/badges/gpa.svg)](https://codeclimate.com/github/shakacode/react-webpack-rails-tutorial) [![Coverage Status](https://coveralls.io/repos/shakacode/react-webpack-rails-tutorial/badge.svg?branch=master&service=github)](https://coveralls.io/github/shakacode/react-webpack-rails-tutorial?branch=master)

*If this projects helps you, please give us a star!*

## Thank you from Justin Gordon and [ShakaCode](http://www.shakacode.com)

Thank you for considering using [React on Rails](https://github.com/shakacode/react_on_rails).

* **Video:** [Front-End Sadness to Happiness: The React on Rails Story](https://www.youtube.com/watch?v=SGkTvKRPYrk): History, motivations, philosophy, and overview.
* *[Click here for talk slides](http://www.shakacode.com/talks).*

We at [ShakaCode](http://www.shakacode.com) are a small, boutique, remote-first application development company. We fund this project by:

* Providing priority support and training for anything related to React + Webpack + Rails in our [Coaching Program](http://www.shakacode.com/work/shakacode-coaching-plan.pdf).
* Building custom web and mobile (React Native) applications. We typically work with a technical founder or CTO and instantly provide a full development team including designers.
* Migrating **Angular** + Rails to React + Rails. You can see an example of React on Rails and our work converting Angular to React on Rails at [egghead.io](https://egghead.io/browse/frameworks).
* Augmenting your team to get your product completed more efficiently and quickly.

My article "[Why Hire ShakaCode?](https://blog.shakacode.com/can-shakacode-help-you-4a5b1e5a8a63#.jex6tg9w9)" provides additional details about our projects.

If any of this resonates with you, please email me, [justin@shakacode.com](mailto:justin@shakacode.com). I offer a free half-hour project consultation, on anything from React on Rails to any aspect of web or mobile application development for both consumer and enterprise products.

We are **[currently looking to hire](http://www.shakacode.com/about/#work-with-us)** like-minded developers that wish to work on our projects, including [Friends and Guests](https://www.friendsandguests.com).

I appreciate your attention and sharing of these offerings with anybody that we can help. Your support allows me to bring you and your team [front-end happiness in the Rails world](https://www.youtube.com/watch?v=SGkTvKRPYrk).

Aloha and best wishes from the ShakaCode team!

------

# Community
Please [**click to subscribe**](https://app.mailerlite.com/webforms/landing/l1d9x5) to keep in touch with Justin Gordon and [ShakaCode](http://www.shakacode.com/). I intend to send announcements of new releases of React on Rails and of our latest [blog articles](https://blog.shakacode.com) and tutorials. Subscribers will also have access to **exclusive content**, including tips and examples.

[![2017-01-31_14-16-56](https://cloud.githubusercontent.com/assets/1118459/22490211/f7a70418-e7bf-11e6-9bef-b3ccd715dbf8.png)](https://app.mailerlite.com/webforms/landing/l1d9x5)

* **Slack Room**: [Contact us](mailto:contact@shakacode.com) for an invite to the ShakaCode Slack room! Let us know if you want to contribute.
* **[forum.shakacode.com](https://forum.shakacode.com)**: Post your questions
* **[@ShakaCode on Twitter](https://twitter.com/shakacode)**
* For a live, [open source](https://github.com/shakacode/react-webpack-rails-tutorial), example of this gem, see [www.reactrails.com](http://www.reactrails.com).

------

# Testimonials
From Joel Hooks, Co-Founder, Chief Nerd at [egghead.io](https://egghead.io/), January 30, 2017:

![2017-01-30_11-33-59](https://cloud.githubusercontent.com/assets/1118459/22443635/b3549fb4-e6e3-11e6-8ea2-6f589dc93ed3.png)

For more testimonials, see [Live Projects](PROJECTS.md) and [Kudos](./KUDOS.md).

-------

# React on Rails Pro!
Justin is currently working with a couple contributors on some new private examples that incorporate ShakaCode's best practices for industrial strength apps using React on Rails. If you're interested in getting access to these and/or contributing, [email justin@shakacode.com](mailto:justin@shakacode.com). Technologies will include Webpack v2, Yarn, CSS Modules, Bootstrap v4, Redux-Saga, Normalizr, Reselect, etc.

# Videos

### [React On Rails Tutorial Series](https://www.youtube.com/playlist?list=PL5VAKH-U1M6dj84BApfUtvBjvF-0-JfEU)

1. [History and Motivation](https://youtu.be/F4oymbUHvoY)
2. [Basic Tutorial Walkthrough](https://youtu.be/_bjScw60FBk)
3. [Code Walkthrough](https://youtu.be/McQ9UM-_ocQ)

## NEWS

* 2016-09-07: Project migrated to [React on Rails v9 with rails/webpacker](https://github.com/shakacode/react-webpack-rails-tutorial/pull/416).
* Action Cable was recently added in [PR #355](https://github.com/shakacode/react-webpack-rails-tutorial/pull/355). See [PR#360](https://github.com/shakacode/react-webpack-rails-tutorial/pull/360) for additional steps to make this work on Heroku. Note, you need to be running redis. We installed the free Heroku redis add-on.
* We made a react-native client: [shakacode/reactrails-react-native-client](https://github.com/shakacode/reactrails-react-native-client/). If you want to hack on this with us, [email justin@shakacode.com](mailto:justin@shakacode.com).
* We have [some other open PRs](https://github.com/shakacode/react-webpack-rails-tutorial/pulls) of things we may soon be incorporating, including localization and action cable! Stay tuned! If you have opinions of what should or should not get merged, get in touch with [justin@shakacode.com](mailto:justin@shakacode.com).

This tutorial app demonstrates advanced functionality beyond what's provided by the React on Rails generators, mostly in the area of Webpack and React usage. Due to the architecture of placing all client side assets in the `/client` directory, React on Rails supports just about anything that Webpack and JavaScript can do, such as:

1. **Handling of Sass and Bootstrap**: This tutorial uses [CSS modules via Webpack](https://github.com/css-modules/css-modules) so that all your client side configuration can be handled in a pure JavaScript tooling manner. This allows for hot reloading and a better separation of concerns (Rails for server-side functionality versus NPM/Webpack for all things client side). The alternative approach of using the traditional Rails Asset Pipeline for your CSS is simpler and supported by [React on Rails](https://github.com/shakacode/react_on_rails). _If you are looking for more information about using assets in your client JavaScript, check out the React on Rails docs: [Rails Assets](https://github.com/shakacode/react_on_rails/blob/master/docs/additional-reading/rails-assets.md) and [Webpack, the Asset Pipeline, and Using Assets w/ React](https://github.com/shakacode/react_on_rails/blob/master/docs/additional-reading/rails-assets-relative-paths.md). For real examples, look at the Webpack config files in the [client/](https://github.com/shakacode/react-webpack-rails-tutorial/tree/master/client) directory of this project, as well as some of the components that are using the client side assets (ex. [CommentScreen component](https://github.com/shakacode/react-webpack-rails-tutorial/blob/master/client/app/bundles/comments/components/CommentScreen/CommentScreen.jsx))._
1. **Hot Reloading with Rails**: If you want to implement hot reloading after using React on Rails generators, then see [Hot Reloading of Assets For Rails Development](https://github.com/shakacode/react_on_rails/blob/master/docs/additional-reading/hot-reloading-rails-development.md). The tutorial has different startup scripts than the generators. The dev mode has the WebapackDev server providing the JS and CSS assets to the tutorial. This means you get **HOT RELOADING** of your JS and CSS within your Rails app.

# React, Redux, React-Bootstrap, ES7, Webpack, Rails Demo
## Server Rendering via the [react_on_rails gem](https://github.com/shakacode/react_on_rails)

#### Live at [www.reactrails.com](http://www.reactrails.com/)
##### Check out our [react-native client for this project!](https://github.com/shakacode/react-native-tutorial)
This is a simple example application that illustrates the use of ReactJs to implement a commenting system. Front-end code leverages both ReactJs and Rails asset pipeline while the backend is 100% Rails. It shows off a little bit of the interactivity of a ReactJs application, allowing the commmenter to choose the form layout. `react-bootstrap` is used for the React components. A pure Rails UI generated from scaffolding is shown for comparison.

You can see this tutorial live here: [http://reactrails.com/](http://reactrails.com/)

## Table of Contents

+ [Demoed Functionality](#demoed-functionality)
  + [Technologies Involved](#technologies-involved)
+ [Basic Demo Setup](#basic-demo-setup)
  + [Basic Command Line](#basic-command-line)
  + [Experimenting with Hot Reloading](#experimenting-with-hot-reloading-applies-to-both-procfilehot-and-procfileexpress)
+ [Javascript Development without Rails](#javascript-development-without-rails-using-the-webpack-dev-server)
+ [Rails Integration](#rails-integration)
+ [Webpack](#webpack)
  + [Configuration Files](#configuration-files)
  + [Additional Resources](#additional-resources)
+ [Sass, CSS Modules, and Twitter Bootstrap integration](#sass-css-modules-and-twitter-bootstrap-integration)
  + [Fonts with SASS](#fonts-with-sass)
+ [Process Management during Development](#process-management-during-development)
+ [Rendering with Express Server](#rendering-with-express-server)
  + [Setup](#setup)
+ [Contributors](#contributors)
  + [About ShakaCode](#about-shakacode)
  + [RubyMine and WebStorm](#rubymine-and-webstorm)
+ [Open Code of Conduct](#open-code-of-conduct)

## Demoed Functionality

- Example of using the [react_on_rails gem](https://github.com/shakacode/react_on_rails) for easy react/webpack integration with Rails.
- Example of React with [CSS Modules](http://glenmaddern.com/articles/css-modules) inside of Rails using Webpack as described in [Smarter CSS builds with Webpack](http://bensmithett.com/smarter-css-builds-with-webpack/).
- Example of enabling hot reloading of both JS and CSS (modules) from your Rails app in development mode. Change your code. Save. Browser updates without a refresh!
- Example of React/Redux with Rails Action Cable.
- Example of Rails 5 with ReactJs/Redux/React-Router with Webpack and ES7.
- Enabling development of a JS client independently from Rails using the [Webpack Dev Server](https://webpack.github.io/docs/webpack-dev-server.html). You can see this by starting the app and visiting http://localhost:4000
- Enabling the use of npm modules and [Babel](https://babeljs.io/) with a Rails application using [Webpack](https://webpack.github.io/).
- Easily enable retrofitting such a JS framework into an existing Rails app. You don't need a brand new single page app!
- Example setting up Ruby and JavaScript linting in a real project, with corresponding CI rake tasks.
- Enabling the i18n functionality with [react-intl](https://github.com/yahoo/react-intl).

### Technologies involved

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

## Basic Demo Setup
1. Be sure that you have Node installed! We suggest [nvm](https://github.com/creationix/nvm), with node version `v6.0` or above. See this article [Updating and using nvm](http://forum.shakacode.com/t/updating-and-using-nvm/293).
1. `git clone git@github.com:shakacode/react-webpack-rails-tutorial.git`
1. `cd react-webpack-rails-tutorial`
1. Check that you have Ruby 2.3.0 or greater
1. Check that you're using the right version of node. Run `nvm list` to check. Use 5.5 or greater.
1. Check that you have Postgres installed. Run `which postgres` to check. Use 9.4 or greater.
1. Check that you have `qmake` installed. Run `which qmake` to check. If missing, follow these instructions: [Installing Qt and compiling capybara-webkit](https://github.com/thoughtbot/capybara-webkit/wiki/Installing-Qt-and-compiling-capybara-webkit)
1. Check that you have Redis installed. Run `which redis-server` to check. If missing, install with Homebrew (`brew install redis`) or follow [these instructions](https://redis.io/topics/quickstart#installing-redis
  ).
1. `bundle install`
1. `brew install yarn`
1. `yarn`
1. `rake db:setup`
1. `foreman start -f Procfile.hot`
  1. Open a browser tab to http://localhost:5000 for the Rails app example with HOT RELOADING
  2. Try Hot Reloading steps below!
1. `foreman start -f Procfile.static`
  1. Open a browser tab to http://localhost:5000 for the Rails app example.
  2. When you make changes, you have to refresh the browser page.

### Basic Command Line
1. Run all linters and tests: `rake`
1. See all npm commands: `yarn run`
1. To start all development processes: `foreman start -f Procfile.dev`
1. To start only all Rails development processes: `foreman start -f Procfile.hot`

### Experimenting with Hot Reloading: applies to both `Procfile.hot` and `Procfile.express`
1. With the browser open to any JSX file, such as [client/app/bundles/comments/components/CommentBox/CommentBox.jsx](client/app/bundles/comments/components/CommentBox/CommentBox.jsx) and you can change the JSX code, hit save, and you will see the screen update without refreshing the window. This applies to port 3000 and port 4000.
1. Try changing a `.scss` file, such as a color in [client/app/bundles/comments/components/CommentBox/CommentList/Comment/Comment.scss](client/app/bundles/comments/components/CommentBox/CommentList/Comment/Comment.scss). You can see port 3000 or 4000 update automatically.
1. Be sure to take a look at the different Procfiles in this directory, as described below.


## Javascript development without Rails: using the Webpack Dev Server

We include a sample setup for developing your JavaScript files without Rails. However, this is no longer recommended as it's best to create your APIs in Rails, and take advantage of the hot reloading of your react components provided by this project.

1. Run the node server with file `server-express.js` with command `yarn run` or `cd client && node server-express.js`.
2. Point your browser to [http://localhost:4000](http://localhost:4000)

Save a change to a JSX file and see it update immediately in the browser! Note, any browser state still exists, such as what you've typed in the comments box. That's totally different than [Live Reload](http://livereload.com/) which refreshes the browser. Note, we just got this working with your regular Rails server! See above for **Hot Loading**.

## Rails Integration
**We're now using Webpack for all Sass and JavaScript assets so we can do CSS Modules within Rails!**

+ **Production Deployment**: We previously had created a file `lib/tasks/assets.rake` to modify the Rails precompile task to deploy assets for production. However, we add this automatically in newer versions of React on Rails. If you need to customize this file, see [lib/tasks/assets.rake from React on Rails](https://github.com/shakacode/react_on_rails/blob/master/lib/tasks/assets.rake) as an example as well as the doc file: [heroku-deployment.md](https://github.com/shakacode/react_on_rails/blob/master/docs/additional-reading/heroku-deployment.md).
   + Configure Buildpacks
      ```
      heroku buildpacks:set heroku/ruby --app your-app
      heroku buildpacks:add --index 1 heroku/nodejs --app your-app
      heroku buildpacks:set --index 3 https://github.com/sreid/heroku-buildpack-sourceversion.git --app your-app
      ```
+ **Development Mode**: Two flavors: Hot reloading assets (JavaScript & CSS) and Static loading.
   + **Hot Loading**: We modify the URL in [application.html.erb](app/views/layouts/application.html.erb) based on whether or not we're in production mode using the helpers `env_stylesheet_link_tag` and `env_javascript_include_tag`. *Development mode* uses the Webpack Dev server running on port 3500. Other modes (production/test) use precompiled files. See `Procfile.hot`. `Procfile.dev` also starts this mode. Note, *you don't have to refresh a Rails web page to view changes to JavaScript or CSS*.

   + **Static Loading**: This uses webpack to create physical files of the assets, both JavaScript and CSS. This is essentially what we had before we enabled *Hot Loading*. You have to *refresh* the page to see changes to JavaScript or CSS. See `Procfile.static`. It is important to note that tests will use the same statically generated files.

      + Note, the following view helpers do the magic to make this work:
   ```erb
  <%= env_stylesheet_link_tag(static: 'application_static', hot: 'application_non_webpack', options: { media: 'all', 'data-turbolinks-track' => true })  %>
  <%= env_javascript_include_tag(hot: ['http://localhost:3500/vendor-bundle.js', 'http://localhost:3500/app-bundle.js']) %>
  <%= env_javascript_include_tag(static: 'application_static', hot: 'application_non_webpack', options: { 'data-turbolinks-track' => true }) %>
  ```

## Testing
+ See [Yak Shaving Failing Integration Tests with React and Rails](https://blog.shakacode.com/yak-shaving-failing-integration-tests-with-react-a93444886c8c#.io9464uvz)

+ Be sure to see [Integration Test Notes](./docs/integration-test-notes.md) for advice on running your integration tests.

+ **Testing Mode**: When running tests, it is useful to run `foreman start -f Procfile.spec` in order to have webpack automatically recompile the static bundles. Rspec is configured to automatically check whether or not this process is running. If it is not, it will automatically rebuild the webpack bundle to ensure you are not running tests on stale client code. This is achieved via the `ReactOnRails::TestHelper.configure_rspec_to_compile_assets(config)`
line in the `rails_helper.rb` file. If you are using this project as an example and are not using RSpec, you may want to implement similar logic in your own project.

## Webpack
### Configuration Files

- `webpack.client.base.config.js`: Common **client** configuration file to minimize code duplication for `webpack.client.rails.build.config`, `webpack.client.rails.hot.config`, `webpack.client.express.config`
- `webpack.client.express.config.js`: Webpack configuration for Express server [client/server-express.js](client/server-express.js)
- `webpack.client.rails.build.config.js`: Client side js bundle for deployment and tests.
- `webpack.client.rails.hot.config.js`: Webpack Dev Server bundler for serving rails assets on port 3500, used by [client/server-rails-hot.js](client/server-rails-hot.js), for hot reloading JS and CSS within Rails.
- `webpack.server.rails.build.config.js`: Server side js bundle, used by server rendering.

### Additional Resources
- [Webpack Docs](http://webpack.github.io/docs/)
- [Webpack Cookbook](https://christianalfoni.github.io/react-webpack-cookbook/)
- Good overview: [Pete Hunt's Webpack Howto](https://github.com/petehunt/webpack-howto)

## Sass, CSS Modules, and Twitter Bootstrap Integration
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

### Fonts with SASS
The tutorial makes use of a custom font OpenSans-Light. We're doing this to show how to add assets for the CSS processing. The font files are located under [client/app/assets/fonts](client/app/assets/fonts) and are loaded by both the Rails asset pipeline and the Webpack HMR server.

## Process management during development
```
bundle exec foreman start -f <Procfile>
```

1. [`Procfile.dev`](Procfile.dev): Starts the Webpack Dev Server and Rails with Hot Reloading.
2. [`Procfile.hot`](Procfile.hot): Starts the Rails server and the webpack server to provide hot reloading of assets, JavaScript and CSS.
3. [`Procfile.static`](Procfile.static): Starts the Rails server and generates static assets that are used for tests.
5. [`Procfile.spec`](Procfile.spec): Starts webpack to create the static files for tests. **Good to know:** If you want to start `rails s` separately to debug in `pry`, then run `Procfile.spec` to generate the assets and run `rails s` in a separate console.
6. [`Procfile.static.trace`](Procfile.static.trace): Same as `Procfile.static` but prints tracing information useful for debugging server rendering.
4. [`Procfile.express`](Procfile.express): Starts only the Webpack Dev Server for rendering your components with only an Express server.

In general, you want to avoid running more webpack watch processes than you need.

## Rendering with Express Server
UPDATE: 2016-07-31

We no longer recommend using an express server with Rails. It's simply not necessary because:

1. Rails can hot reload
2. There's extra maintenance in keeping this synchronized.
3. React on Rails does not have a shared_store JS rendering, per [issue #504](https://github.com/shakacode/react_on_rails/issues/504)

### Setup

1. `foreman start -f Procfile.express`
2. Open a browser tab to http://localhost:4000 for the Hot Module Replacement Example just using an express server (no Rails involved). This is good for fast prototyping of React components. However, this setup is not as useful now that we have hot reloading working for Rails!
3. Try Hot Reloading steps below!

## Contributors
[The Shaka Code team!](http://www.shakacode.com/about/), led by [Justin Gordon](https://github.com/justin808/), along with with many others. See [contributors.md](docs/contributors.md)

### RubyMine and WebStorm
Special thanks to [JetBrains](https://www.jetbrains.com) for their great tools: [RubyMine](https://www.jetbrains.com/ruby/) and [WebStorm](https://www.jetbrains.com/webstorm/). Some developers of this project use RubyMine at the top level, mostly for Ruby work, and we use WebStorm opened up to the `client` directory to focus on JSX and Sass files.

## Open Code of Conduct
This project adheres to the [Open Code of Conduct](http://todogroup.org/opencodeofconduct/#fetch/opensource@github.com). By participating, you are expected to uphold this code.

## About [ShakaCode](http://www.shakacode.com/)
If you would like to know more about ShakaCode, please read [Who Is ShakaCode](http://www.shakacode.com/2015/09/17/who-is-shaka-code.html) and [Success the ShakaCode Way!](http://www.shakacode.com/2015/11/26/success-the-shakacode-way.html)

Please visit [our forums!](http://forum.shakacode.com). We've got a [category dedicated to react_on_rails](http://forum.shakacode.com/c/rails/reactonrails).

You can also join our slack room for some free advice. Email us for an invite.

We're looking for great developers that want to work with Rails + React (and react-native!) with a remote-first, distributed, worldwide team, for our own products, client work, and open source. [More info here](http://www.shakacode.com/about/index.html#work-with-us).

---
*Identical to top of page*

## Thank you from Justin Gordon and [ShakaCode](http://www.shakacode.com)

Thank you for considering using [React on Rails](https://github.com/shakacode/react_on_rails).

* **Video:** [Front-End Sadness to Happiness: The React on Rails Story](https://www.youtube.com/watch?v=SGkTvKRPYrk): History, motivations, philosophy, and overview.
* *[Click here for talk slides](http://www.shakacode.com/talks).*

We at [ShakaCode](http://www.shakacode.com) are a small, boutique, remote-first application development company. We fund this project by:

* Providing priority support and training for anything related to React + Webpack + Rails in our [Coaching Program](http://www.shakacode.com/work/shakacode-coaching-plan.pdf).
* Building custom web and mobile (React Native) applications. We typically work with a technical founder or CTO and instantly provide a full development team including designers.
* Migrating **Angular** + Rails to React + Rails. You can see an example of React on Rails and our work converting Angular to React on Rails at [egghead.io](https://egghead.io/browse/frameworks).
* Augmenting your team to get your product completed more efficiently and quickly.

My article "[Why Hire ShakaCode?](https://blog.shakacode.com/can-shakacode-help-you-4a5b1e5a8a63#.jex6tg9w9)" provides additional details about our projects.

If any of this resonates with you, please email me, [justin@shakacode.com](mailto:justin@shakacode.com). I offer a free half-hour project consultation, on anything from React on Rails to any aspect of web or mobile application development for both consumer and enterprise products.

We are **[currently looking to hire](http://www.shakacode.com/about/#work-with-us)** like-minded developers that wish to work on our projects, including [Friends and Guests](https://www.friendsandguests.com).

I appreciate your attention and sharing of these offerings with anybody that we can help. Your support allows me to bring you and your team [front-end happiness in the Rails world](https://www.youtube.com/watch?v=SGkTvKRPYrk).

Aloha and best wishes from the ShakaCode team!
