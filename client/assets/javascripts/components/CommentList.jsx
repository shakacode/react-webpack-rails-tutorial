import React from 'react';
import Comment from './Comment';

const CommentList = React.createClass({
  displayName: 'CommentList',

  propTypes: {
    comments: React.PropTypes.object,
  },

  render() {
    const commentNodes = this.props.comments.reverse().map((comment, index) => {
      // `key` is a React-specific concept and is not mandatory for the
      // purpose of this tutorial. if you're curious, see more here:
      // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
      return (
        <Comment author={comment.get('author')} key={index} text={comment.get('text')}/>
      );
    });

    return (
      <div className='commentList'>
        {commentNodes}
      </div>
    );
  },
});

export default CommentList;
