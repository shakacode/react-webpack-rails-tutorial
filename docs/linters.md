# Linting and Code Inspection
## Running Lint and CI tasks
* Default rake task runs tests and linting (yes, repeating this!) (see `ci.rake`)
* See file [README.md](client/README.md) for how to run ESLint and JSCS
* See scripts `scripts/lint` and `client/bin/lint`.
* We're using the [AirBnb JavaScript style guidelines](https://github.com/airbnb/javascript).

### RubyMine/Webstorm Linting Configuration
  * I started out trying to make RubyMine and WebStorm catch and fix linting errors. However, I find it faster to just do this with the command line. Your mileage may vary.
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
