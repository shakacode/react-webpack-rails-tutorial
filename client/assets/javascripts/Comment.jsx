'use strict';

import marked from 'marked';
import React from 'react';

var Comment = React.createClass({
  displayName: 'Comment',

  propTypes: {
    author: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired
  },

  render: function() {
    var rawMarkup = marked(this.props.text);
    return (
      <div className='comment'>
        <h2 className='comment-author foobar'>
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}}/>
      </div>
    );
  }
});

export default Comment;
