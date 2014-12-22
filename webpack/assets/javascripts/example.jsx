/** @jsx React.DOM */

module React from 'react';
import { CommentBox } from './CommentBox';

var $ = require('jquery');

var render = () => {
  if ($("#content").length > 0) {
    React.renderComponent(
      <div>
        <CommentBox url="comments.json" pollInterval={2000} />
        <div className="logo container">Brought to you by</div>
      </div>,
      document.getElementById('content')
    );
  }
}

$(function() {
  render();
  // Next part is to make this work with turbo-links
  $(document).on("page:change", () => {
    render();
  });
});
