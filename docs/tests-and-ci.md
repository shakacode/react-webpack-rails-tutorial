# Running Tests and CI

*Default rake task runs feature specs, jest tests and linting*

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

Run the js tests continually with;

      cd client
      yarn run test --watch

## CI configuration
Add those lines to your CI scripts after `bundle install`

```sh
yarn install
```
