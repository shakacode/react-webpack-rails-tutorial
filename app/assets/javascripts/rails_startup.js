$(document).on('ready page:load', function () {
  // highlight active page in the top menu
  $('nav a').parents('li,ul').removeClass('active');
  $('nav a[href="' + this.location.pathname + '"]').parents('li,ul').addClass('active');
});
