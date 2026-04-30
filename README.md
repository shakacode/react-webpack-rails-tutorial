   [![Code Climate](https://codeclimate.com/github/shakacode/react-webpack-rails-tutorial/badges/gpa.svg)](https://codeclimate.com/github/shakacode/react-webpack-rails-tutorial) [![Coverage Status](https://coveralls.io/repos/shakacode/react-webpack-rails-tutorial/badge.svg?branch=master&service=github)](https://coveralls.io/github/shakacode/react-webpack-rails-tutorial?branch=master)

# React, Redux, Tailwind CSS, React Server Components, ES2024, Rspack, Ruby on Rails Demo

* Server-Side Rendering and React Server Components via [React on Rails Pro](https://www.shakacode.com/react-on-rails-pro/) with the Node Renderer
* Live at [www.reactrails.com](http://www.reactrails.com/)

## Control Plane Deployment Example

[Control Plane](https://shakacode.controlplane.com) offers a viable, cost-saving alternative to Heroku, especially when using the [cpflow gem](https://rubygems.org/gems/cpflow) to deploy to Control Plane.

ShakaCode recently migrated [HiChee.com](https://hichee.com) to Control Plane, resulting in a two-thirds reduction in server hosting costs!

See [./.controlplane/readme.md](./.controlplane/readme.md) for local `cpflow` setup plus the shared `cpflow-*` GitHub Actions flow for review apps, automatic staging deploys, and manual promotion to production.

The instructions leverage the `cpflow` CLI, with source code and many more tips on how to migrate from Heroku to Control Plane
in https://github.com/shakacode/heroku-to-control-plane.

----

## React on Rails Pro and ShakaCode Pro Support

React on Rails Pro provides Node server rendering and other performance enhancements for React on Rails.

[![2018-09-11_10-31-11](https://user-images.githubusercontent.com/1118459/45467845-5bcc7400-b6bd-11e8-91e1-e0cf806d4ea4.png)](https://blog.shakacode.com/hvmns-90-reduction-in-server-response-time-from-react-on-rails-pro-eb08226687db)

* [HVMN Testimonial, Written by Paul Benigeri, October 12, 2018](https://github.com/shakacode/react_on_rails/blob/master/docs/testimonials/hvmn.md)
* [HVMN’s 90% Reduction in Server Response Time from React on Rails Pro](https://blog.shakacode.com/hvmns-90-reduction-in-server-response-time-from-react-on-rails-pro-eb08226687db)
* [Egghead React on Rails Pro Deployment Highlights](https://github.com/shakacode/react_on_rails/wiki/Egghead-React-on-Rails-Pro-Deployment-Highlights)

For more information, see the [React on Rails Pro Docs](https://www.shakacode.com/react-on-rails-pro/).

* Optimizing your front-end setup with Rspack + Shakapacker for React on Rails, including SSR and code splitting.
* Upgrading your app to the current React on Rails 16.4 / Shakapacker 9.7 stack with modern asset builds.
* Better performance client and server side.

ShakaCode can also help you with your custom software development needs. We specialize in marketplace and e-commerce applications that utilize both Rails and React. We can even leverage our code for [HiChee.com](https://hichee.com) for your app!

See the [ShakaCode Client Engagement Model](https://www.shakacode.com/blog/client-engagement-model/) article to learn how we can work together.

------

## Community

* **[forum.shakacode.com](https://forum.shakacode.com)**: Post your questions
* **[@railsonmaui on Twitter](https://twitter.com/railsonmaui)**
* For a live, example of the code in this repo, see [www.reactrails.com](http://www.reactrails.com).

------

## Testimonials
From Joel Hooks, Co-Founder, Chief Nerd at [egghead.io](https://egghead.io/), January 30, 2017:

![2017-01-30_11-33-59](https://cloud.githubusercontent.com/assets/1118459/22443635/b3549fb4-e6e3-11e6-8ea2-6f589dc93ed3.png)

For more testimonials, see [Live Projects](https://github.com/shakacode/react_on_rails/blob/master/PROJECTS.md) and [Kudos](https://github.com/shakacode/react_on_rails/blob/master/KUDOS.md).

-------

## Videos

### [React On Rails Tutorial Series](https://www.youtube.com/playlist?list=PL5VAKH-U1M6dj84BApfUtvBjvF-0-JfEU)

1. [History and Motivation](https://youtu.be/F4oymbUHvoY)
2. [Basic Tutorial Walkthrough](https://youtu.be/_bjScw60FBk)
3. [Code Walkthrough](https://youtu.be/McQ9UM-_ocQ)

## NEWS

* 2022-01-11: Added example of deployment [to the ControlPlane](.controlplane/readme.md).

You can see this tutorial live here: [http://reactrails.com/](http://reactrails.com/)

## Table of Contents

+ [Demoed Functionality](#demoed-functionality)
  + [Technologies Involved](#technologies-involved)
+ [Basic Demo Setup](#basic-demo-setup)
  + [Basic Command Line](#basic-command-line)
+ [Javascript Development without Rails](#javascript-development-without-rails-using-the-rspack-dev-server)
+ [Rails Integration](#rails-integration)
+ [Rspack](#rspack-with-shakapacker)
  + [Configuration Files](#configuration-files)
  + [Additional Resources](#additional-resources)
+ [React Server Components (RSC)](#react-server-components-rsc)
+ [Thruster HTTP/2 Proxy](#thruster-http2-proxy)
+ [Sass, CSS Modules, and Tailwind CSS integration](#sass-css-modules-and-tailwind-css-integration)
  + [Fonts with SASS](#fonts-with-sass)
+ [Process Management during Development](#process-management-during-development)
+ [Contributors](#contributors)
  + [About ShakaCode](#about-shakacode)
  + [RubyMine and WebStorm](#rubymine-and-webstorm)
+ [Open Code of Conduct](#open-code-of-conduct)

## Demoed Functionality

- Example of using [React on Rails Pro](https://www.shakacode.com/react-on-rails-pro/) with the Node Renderer for server-side rendering and React Server Components.
- Example of [React Server Components](#react-server-components-rsc) with streaming, Suspense fallbacks, error boundaries, and client-driven re-fetching — see the `/server-components` page.
- Example of `'use client'` directives splitting a tree between server-rendered and client-hydrated components (the "donut pattern").
- Example of using the [react_on_rails gem](https://github.com/shakacode/react_on_rails) (via React on Rails Pro) for React + Rspack integration with Rails.
- Example of React with [CSS Modules](http://glenmaddern.com/articles/css-modules) inside Rails using modern Shakapacker/Rspack builds.
- Example of enabling hot reloading of both JS and CSS (modules) from your Rails app in development mode. Change your code. Save. Browser updates without a refresh!
- Example of React/Redux with Rails Action Cable.
- Example of Rails 8 with ReactJs/Redux/React-Router with Rspack and modern JavaScript.
- Enabling development of a JS client independently from Rails using the Rspack dev server. You can see this by starting the app and visiting http://localhost:4000
- Enabling the use of npm modules and [Babel](https://babeljs.io/) with a Rails application using [Rspack](https://rspack.dev/).
- Easily enable retrofitting such a JS framework into an existing Rails app. You don't need a brand new single page app!
- Example setting up Ruby and JavaScript linting in a real project, with corresponding CI rake tasks.
- Enabling the i18n functionality with [react-intl](https://github.com/yahoo/react-intl).

### Technologies involved

See package.json and Gemfile for versions

1. [React on Rails Pro](https://www.shakacode.com/react-on-rails-pro/) with the Node Renderer for SSR and React Server Components
1. [React 19](http://facebook.github.io/react/) with React Server Components support
1. [Redux](https://github.com/reactjs/redux)
1. [react-router](https://github.com/reactjs/react-router)
1. [react-router-redux](https://github.com/reactjs/react-router-redux)
1. [Rspack with hot-reload](https://rspack.dev/guide/features/dev-server) (for local dev)
1. [SWC transpiler](https://swc.rs/) for fast JavaScript/TypeScript compilation
1. [Ruby on Rails 8](http://rubyonrails.org/) for backend app and comparison with plain HTML
1. [Thruster](https://github.com/basecamp/thruster) - Zero-config HTTP/2 proxy for optimized asset delivery
1. [Heroku deployment guide](https://devcenter.heroku.com/articles/getting-started-with-rails8)
1. [Deployment to the ControlPlane](.controlplane/readme.md)
1. [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)

## Basic Demo Setup

### Prerequisites
- Node `v22.3.0` or above. Be sure that you have Node installed! We suggest using [nvm](https://github.com/creationix/nvm) and running `nvm list` to check the active Node version. See this article [Updating and using nvm](http://forum.shakacode.com/t/updating-and-using-nvm/293).
- Ruby 3.4.6 or above
- Postgres v9.2 or above
- Redis. Check that you have Redis installed by running `which redis-server`. If missing and on MacOS, install with Homebrew (`brew install redis`)
- [Yarn](https://yarnpkg.com/).

### Setup
1. `git clone git@github.com:shakacode/react-webpack-rails-tutorial.git`
1. `cd react-webpack-rails-tutorial`
1. `bundle install`
1. `yarn`
1. `rake db:setup`
1. `rails start`
    - Open a browser tab to http://localhost:3000 for the Rails app example

### Basic Command Line
- Run all linters and tests: `rake`
- See all npm commands: `yarn run`
- To start all development processes: `foreman start -f Procfile.dev`
- To start only all Rails development processes: `foreman start -f Procfile.hot`

## Javascript Development without Rails using the Rspack Dev Server

Start the full development stack with `foreman start -f Procfile.dev`, then open <http://localhost:4000> to iterate on the JavaScript client with hot reloading.

## Rails Integration
**We're now using Rspack for all Sass and JavaScript assets so we can do CSS Modules within Rails!**

+ **Production Deployment**: [heroku-deployment.md](https://github.com/shakacode/react_on_rails/blob/master/docs/additional-reading/heroku-deployment.md).
   + Configure Buildpacks
      ```
      heroku buildpacks:set heroku/ruby --app your-app
      heroku buildpacks:add --index 1 heroku/nodejs --app your-app
      heroku buildpacks:set --index 3 https://github.com/sreid/heroku-buildpack-sourceversion.git --app your-app
      ```

## Testing
+ See [Yak Shaving Failing Integration Tests with React and Rails](https://blog.shakacode.com/yak-shaving-failing-integration-tests-with-react-a93444886c8c#.io9464uvz)

+ Be sure to see [Integration Test Notes](./docs/integration-test-notes.md) for advice on running your integration tests.

+ **Testing Mode**: When running tests, it is useful to run `foreman start -f Procfile.spec` in order to have Rspack automatically recompile the static bundles. Rspec is configured to automatically check whether or not this process is running. If it is not, it will automatically rebuild the bundle to ensure you are not running tests on stale client code. This is achieved via the `ReactOnRails::TestHelper.configure_rspec_to_compile_assets(config)`
line in the `rails_helper.rb` file. If you are using this project as an example and are not using RSpec, you may want to implement similar logic in your own project.

## Rspack with Shakapacker

_This project is standardized on Rspack with Shakapacker._

Bundler selection is fixed in `config/shakapacker.yml`:

```yaml
assets_bundler: rspack
```

### Version Targets

- `react_on_rails_pro` gem: `16.6.0`
- `react-on-rails-pro` npm package: `16.6.0`
- `react-on-rails-pro-node-renderer` npm package: `16.6.0`
- `shakapacker` gem/npm package: `10.0.0`
- `@rspack/core` and `@rspack/cli`: `2.0.0-beta.7`
- `react`: `~19.0.4` (minimum for React Server Components)

### Why Rspack

- Faster dev/test/prod compile times
- Better incremental rebuild performance for local development
- One bundler path for browser bundles and SSR bundles

> **Currently on webpack, temporarily.** The repo is built on webpack instead of rspack while [shakacode/react_on_rails_rsc#29](https://github.com/shakacode/react_on_rails_rsc/pull/29) ships rspack support for the RSC plugin. Tracked as a `TODO` in `config/shakapacker.yml`; flips back once that lands.

### Configuration Files

All bundler configuration is in `config/webpack/`:
- `webpackConfig.js` — Composer; produces all bundles (client + SSR + RSC)
- `commonWebpackConfig.js` — Shared base configuration
- `clientWebpackConfig.js` — Client bundle (browser, with HMR + RSC client-references)
- `serverWebpackConfig.js` — SSR bundle (runs in the Pro Node Renderer)
- `rscWebpackConfig.js` — React Server Components bundle (runs in the Pro Node Renderer with the `react-server` resolve condition)
- `bundlerUtils.js` — Bundler detection helper (webpack vs rspack)
- `development.js`, `production.js`, `test.js` — Environment-specific tweaks

### Additional Resources
- [Shakapacker Documentation](https://github.com/shakacode/shakapacker)
- [Rspack Documentation](https://rspack.dev/)

## React Server Components (RSC)

This project demonstrates React Server Components running on top of the React on Rails Pro Node Renderer. With the dev stack running, visit [`/server-components`](http://localhost:3000/server-components) to see the demo.

### What the demo shows

| Section | What it demonstrates |
|---------|----------------------|
| Server Environment | A server-only component reads Node's `os` module and `lodash`; neither library reaches the browser. |
| Interactive Client Component | A `'use client'` component nested inside a server-component tree, hydrated normally — the "donut pattern". |
| Live Server Activity | Client-driven server-component re-fetching via `useRSC().refetchComponent` + `RSCRoute`, with `react-error-boundary` catching simulated errors and a Retry button. |
| Streamed Comments | An async server component receives comments as props from the controller and streams in via `<Suspense>` after the page shell. |

### How the build works

The app produces three bundles, all sharing the `client/app/packs/server-bundle.js` entry:

- **Client bundle** — Browser JavaScript with HMR; emits `react-client-manifest.json` for client-component resolution.
- **SSR bundle** — Traditional server-side rendering; runs in the Pro Node Renderer (port 3800).
- **RSC bundle** — RSC payload generation; runs in the Pro Node Renderer with the `react-server` resolve condition and an extra loader that classifies `'use client'` modules as client references.

The three bundles are gated by env vars:

| Env var | Result |
|---------|--------|
| (default for `bin/shakapacker-dev-server`) | Client bundle only |
| `SERVER_BUNDLE_ONLY=yes` | SSR bundle only |
| `RSC_BUNDLE_ONLY=yes` | RSC bundle only |
| (none, default for `bin/shakapacker`) | All three |

`Procfile.dev` runs three watchers (`wp-client`, `wp-server`, `wp-rsc`), each gated by its own env var, alongside the Rails server and the Pro Node Renderer.

### Setup notes

In addition to the [Basic Demo Setup](#basic-demo-setup) prerequisites:

- A `REACT_ON_RAILS_PRO_LICENSE` environment variable. Development and test environments don't require one (the Pro engine logs an info-level notice instead). Production deploys must set it to a JWT from [pro.reactonrails.com](https://www.shakacode.com/react-on-rails-pro/).
- `RENDERER_PASSWORD` (shared between Rails and the Node Renderer for SSR auth). The dev/test default is provided in `.env.example`; production must override.
- Optional: `RSC_SUSPENSE_DEMO_DELAY=true` adds a small artificial server delay so Suspense fallbacks are visible during the demo. Off by default; enabled on the QA review-app.

### Further reading

- [How React Server Components work](https://www.reactonrails.com/docs/pro/react-server-components/how-react-server-components-work) — RoR Pro's RSC overview
- [Preparing your app for RSC](https://www.reactonrails.com/docs/migrating/rsc-preparing-app) — `'use client'` directive rules
- [Component patterns](https://www.reactonrails.com/docs/migrating/rsc-component-patterns) — async server components and Suspense
- [Data fetching](https://www.reactonrails.com/docs/migrating/rsc-data-fetching) — controller-props pattern (used by `CommentsFeed`)

## Thruster HTTP/2 Proxy

This project uses [Thruster](https://github.com/basecamp/thruster), a zero-config HTTP/2 proxy from Basecamp, for optimized asset delivery and improved performance.

### What Thruster Provides

- **HTTP/2 Support**: Automatic HTTP/2 with multiplexing for faster parallel asset loading
- **Asset Caching**: Intelligent caching of static assets from the `public/` directory
- **Compression**: Automatic gzip/Brotli compression for reduced bandwidth usage
- **Simplified Configuration**: No need for manual early hints configuration
- **Production Ready**: Built-in TLS termination with Let's Encrypt support

### Benefits

Compared to running Puma directly with `--early-hints`:
- **20-30% faster** initial page loads due to HTTP/2 multiplexing
- **40-60% reduction** in transfer size with Brotli compression
- **Simpler setup** - zero configuration required
- **Better caching** - automatic static asset optimization

### Usage

Thruster is already integrated into all Procfiles:

```bash
# Development with HMR
foreman start -f Procfile.dev

# Production
web: bundle exec thrust bin/rails server
```

The server automatically benefits from HTTP/2, caching, and compression without any additional configuration.

For detailed information, troubleshooting, and advanced configuration options, see [docs/thruster.md](docs/thruster.md).

## Sass, CSS Modules, and Tailwind CSS Integration
This example project uses mainly Tailwind CSS for styling.
Besides this, it also demonstrates Sass and CSS modules, particularly for some CSS transitions.

We're using Rspack to handle Sass assets so that we can use CSS modules. The best way to understand how we're handling assets is to closely follow this example. We'll be working on more docs soon. If you'd like to give us a hand, that's a great way to learn about this!

For example in [client/app/bundles/comments/components/CommentBox/CommentBox.jsx](client/app/bundles/comments/components/CommentBox/CommentBox.jsx), see how we use standard JavaScript import syntax to refer to class names that come from CSS modules:

```javascript
import css from './CommentBox.module.scss';

export default class CommentBox extends React.Component {
  render() {
    const { actions, data } = this.props;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      exit: css.elementLeave,
      exitActive: css.elementLeaveActive,
    };
  }
}
```

### Fonts with SASS
The tutorial makes use of a custom font OpenSans-Light. We're doing this to show how to add assets for the CSS processing. The font files are located under [client/app/assets/fonts](client/app/assets/fonts) and are loaded by both the Rails asset pipeline and the Rspack HMR server.

## Process Management during Development
```bash
bundle exec foreman start -f <Procfile>
```

1. [`Procfile.dev`](Procfile.dev): Starts the full development stack with Hot Reloading. Six processes:
   - `rescript` — ReScript watch mode
   - `rails` — Rails server via Thruster on port 3000
   - `wp-client` — Shakapacker dev server with HMR (client bundle)
   - `wp-server` — Shakapacker watcher for the SSR bundle
   - `wp-rsc` — Shakapacker watcher for the React Server Components bundle
   - `node-renderer` — React on Rails Pro Node Renderer on port 3800
1. [`Procfile.dev-static`](Procfile.dev-static): Starts the Rails server and generates static assets that are used for tests.

## Contributors
[The Shaka Code team!](http://www.shakacode.com/about/), led by [Justin Gordon](https://github.com/justin808/), along with with many others. See [contributors.md](docs/contributors.md)

### RubyMine and WebStorm
Special thanks to [JetBrains](https://www.jetbrains.com) for their great tools: [RubyMine](https://www.jetbrains.com/ruby/) and [WebStorm](https://www.jetbrains.com/webstorm/). Some developers of this project use RubyMine at the top level, mostly for Ruby work, and we use WebStorm opened up to the `client` directory to focus on JSX and Sass files.

### Hiring

We're looking for great developers that want to work with Rails + React (and react-native!) with a remote-first, distributed, worldwide team, for our own products, client work, and open source. [More info here](http://www.shakacode.com/about/index.html#work-with-us).

---

## Thank you from Justin Gordon and [ShakaCode](http://www.shakacode.com)

Thank you for considering using [React on Rails](https://github.com/shakacode/react_on_rails).

Aloha and best wishes from the ShakaCode team!
