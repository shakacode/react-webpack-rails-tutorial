import marked from 'marked';
import React from 'react';

const Comment = React.createClass({
  displayName: 'Comment',

  propTypes: {
    author: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
  },

  render() {
    const rawMarkup = marked(this.props.text, { gfm: true, sanitize: true });
    return (
      <div className='comment'>
        <h2 className='comment-author'>
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}}/>
      </div>
    );
  },
});

export default Comment;
