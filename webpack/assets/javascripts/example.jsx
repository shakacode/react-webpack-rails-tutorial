/** @jsx React.DOM */

module React from 'react';
import { CommentBox } from './CommentBox';

var $ = require('jquery');

var render = function() {
  if ($("#content").length > 0) {
    React.renderComponent(
      <div>
        <CommentBox url="comments.json" pollInterval={2000} />
        <div className="twitter-image container"/>
      </div>,
      document.getElementById('content')
    );
  }
}

$(function() {
  render();
  // Next part is to make this work with turbo-links
  $(document).on("page:change", function () {
    render();
  });
});
