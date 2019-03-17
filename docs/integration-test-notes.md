# Integration Test Notes

See [Yak Shaving Failing Integration Tests with React and Rails](https://blog.shakacode.com/yak-shaving-failing-integration-tests-with-react-a93444886c8c#.io9464uvz)

## CI
See the .travis.yml file, at the bottom, to see what driver is used by Travis.

  `DRIVER=selenium bundle exec rake`

Codeship is set to use the default driver.  
  
## Driver Options

Support is included for the following drivers:

1. Selenium Chrome (`DRIVER=selenium_chrome rspec`)
1. Selenium Firefox (`DRIVER=selenium_firefox rspec`)

You may want to experiment with using the different drivers.

## Rspec-retry
* The current retry count is 4, configured in spec_helper.rb.
* When developing new tests, you do not want retry a failure multiple times.
  * Set this env value: `export RSPEC_RETRY_RETRY_COUNT=1`

## Selenium Chrome

You may want to see the [chromedriver-helper docs](https://github.com/flavorjones/chromedriver-helper) and run chromedriver-update to get the latest version of the Chrome driver.

