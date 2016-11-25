// https://gist.github.com/andyjbas/9962218
// disable_animations.js

// No idea which of these is more helpful.
// They both resulted in crashes:
// https://travis-ci.org/shakacode/react-webpack-rails-tutorial/builds/178794772
// var disableAnimationStyles = '-webkit-transition: none !important;' +
//                              '-moz-transition: none !important;' +
//                              '-ms-transition: none !important;' +
//                              '-o-transition: none !important;' +
//                              'transition: none !important;'
var disableAnimationStyles = '-webkit-transition-duration: 0.0s !important;' +
  '-moz-transition-duration: 0.0s !important;' +
  '-ms-transition-duration: 0.0s !important;' +
  '-o-transition-duration: 0.0s  !important;' +
  'transition-duration: 0.0s !important;'

window.onload = function() {
  var animationStyles = document.createElement('style');
  animationStyles.type = 'text/css';
  animationStyles.innerHTML = '* {' + disableAnimationStyles + '}';
  document.head.appendChild(animationStyles);
};
