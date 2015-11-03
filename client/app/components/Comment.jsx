import React, { PropTypes } from 'react';
import marked from 'marked';

const Comment = React.createClass({
  displayName: 'Comment',

  propTypes: {
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  },

  render() {
    const { author, text } = this.props;
    const rawMarkup = marked(text, { gfm: true, sanitize: true });
    return (
      <div className="comment">
        <h2 className="comment-author">
          {author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} className="comment-text"/>
      </div>
    );
  },
});

export default Comment;
