// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.

// Need to be on top to allow Poltergeist test to work with React.
//= require es5-shim/es5-shim
//= require react_on_rails

// It is important that generated/vendor-bundle must be before bootstrap since it is exposing jQuery and jQuery-ujs
//= require generated/vendor-bundle
//= require generated/app-bundle

//= require bootstrap-sprockets
//= require turbolinks
