import React from 'react';
import Comment from './Comment';
import Alert from 'react-bootstrap/lib/Alert';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

const CommentList = React.createClass({
  displayName: 'CommentList',

  propTypes: {
    comments: React.PropTypes.object,
    error: React.PropTypes.any.isRequired,
  },

  errorWarning() {
    // If there is no error, there is nothing to add to the DOM
    if (!this.props.error) return undefined;
    return (
      <Alert bsStyle='danger' key='commentFetchError'>
        <strong>Comments could not be retrieved.</strong> A server error prevented loading comments. Please try again.
      </Alert>
    );
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
      <div>
        <ReactCSSTransitionGroup transitionName='element'>
          {this.errorWarning()}
        </ReactCSSTransitionGroup>
        <div className='commentList'>
          {commentNodes}
        </div>
      </div>
    );
  },
});

export default CommentList;
