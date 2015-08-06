// Only used by rails

// Example of including es5 shims for supporting older browsers
// https://facebook.github.io/react/docs/working-with-the-browser.html
require('es5-shim/es5-shim');
require('es5-shim/es5-sham');

// Due to issue: https://github.com/ariya/phantomjs/issues/12401
// Phantomjs does not like promises
require('es6-promise').polyfill();
