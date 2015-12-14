# Running Tests and CI

*Default rake task runs feature specs, mocha tests and linting*

We have:

* feature tests in /spec/features
* component unit tests in /client/test/
* javascript linting

From the root of the project, you can run all specs+tests+linter with

      npm run test

Run the feature specs individually with `rspec`.

Run the React unit tests (all .js and .jsx files) from the `client` dir with;

      cd client
      npm run test --silent

In lieu of having `mocha --watch` working properly (pull request welcome!), you can have your js tests continually running with `watch`

      npm install -g watch
      cd client
      watch 'npm run test --silent' test/ app/


## CI configuration
Add those lines to your CI scripts after `bundle install`

```sh
npm install
cd client && npm run build:client && npm run build:server
```
