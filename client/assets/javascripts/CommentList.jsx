'use strict';
import React from 'react';
import Comment from './Comment';

var CommentList = React.createClass({
  displayName: 'CommentList',
  propTypes: {
    data: React.PropTypes.array
  },

  render: function() {
    var reversedData = this.props.data.slice(0).reverse();
    var commentNodes = reversedData.map((comment, index) => {

      // `key` is a React-specific concept and is not mandatory for the
      // purpose of this tutorial. if you're curious, see more here:
      // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
      return (
        <Comment author={comment.author} key={index} text={comment.text}/>
      );
    });
    return (
      <div className='commentList'>
        {commentNodes}
      </div>
    );
  }
});

export default CommentList;
