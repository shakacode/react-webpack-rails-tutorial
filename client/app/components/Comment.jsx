import React, { PropTypes } from 'react';
import marked from 'marked';

class Comment extends React.Component {
  static displayName = 'Comment';
  static propTypes = {
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };

  render() {
    const { author, text } = this.props;
    const rawMarkup = marked(text, { gfm: true, sanitize: true });
    return (
      <div className="comment">
        <h2 className="comment-author">
          {author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}}/>
      </div>
    );
  }
}

export default Comment;
