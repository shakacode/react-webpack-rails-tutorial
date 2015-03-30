var $ = require('jquery');

var CommentsFetcher = {
  fetch: function(url) {
    return $.ajax({url: url, dataType: 'json'})
  }
};

module.exports = CommentsFetcher;
