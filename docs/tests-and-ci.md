# Running Tests and CI

*Default rake task runs feature specs, mocha tests and linting*

We have:

* feature tests in /spec/features
* component unit tests in /client/test/
* javascript linting

From the root of the project, you can run all specs+tests+linter with

      yarn run test

Run the feature specs individually with `rspec`.

Run the React unit tests (all .js and .jsx files) from the `client` dir with;

      cd client
      yarn run test --silent

In lieu of having `mocha --watch` working properly (pull request welcome!), you can have your js tests continually running with `watch`

      yarn install -g watch
      cd client
      watch 'yarn run test --silent' test/ app/


## CI configuration
Add those lines to your CI scripts after `bundle install`

```sh
yarn install
```
