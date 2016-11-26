# Integration Test Notes

See [Yak Shaving Failing Integration Tests with React and Rails](https://blog.shakacode.com/yak-shaving-failing-integration-tests-with-react-a93444886c8c#.io9464uvz)

## CI
See the .travis.yml file, at the bottom, to see what driver is used by Travis.

  `DRIVER=selenium bundle exec rake`

Codeship is set to use the default driver.  
  
## Driver Options
The current default driver is poltergeist_errors_ok.

Support is included for the following drivers:

1. Selenium Chrome (`DRIVER=selenium_chrome rspec`)
1. Selenium Firefox (`DRIVER=selenium_firefox rspec`)
1. Poltergeist (`DRIVER=poltergeist rspec`)
1. Poltergeist no animations (`DRIVER=poltergeist_no_animations rspec`)
1. Poltergeist errors ok (`DRIVER=poltergeist_errors_ok rspec`)
1. Webkit (`DRIVER=webkit rspec`). Note, webkit has more errors than the other drivers.

You may want to experiment with using the different drivers.

## Rspec-retry
* The current retry count is 4, configured in spec_helper.rb.
* When developing new tests, you do not want retry a failure multiple times.
  * Set this env value: `export RSPEC_RETRY_RETRY_COUNT=1`

## Selenium Chrome

You may want to see the [chromedriver-helper docs](https://github.com/flavorjones/chromedriver-helper) and run chromedriver-update to get the latest version of the Chrome driver.


## Poltergeist

Poltergeist is awesome because it will crash on JS Errors. Poltergeist is not aswesome because phantomjs is currently having race conditions on crashing a lot.

### 2016-11-25
Polteregeist is consistently crashing due to [issue 830](https://github.com/teampoltergeist/poltergeist/issues/830) and [issue 232](https://github.com/teampoltergeist/poltergeist/issues/232). Hopefully, this will be fixed in the future.

`support/poltergeist.rb:34` contains code to restart phantomjs with the hopes that this will cause a failing test to pass.
