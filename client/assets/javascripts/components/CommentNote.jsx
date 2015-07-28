import React from 'react';

const CommentNote = React.createClass({
  displayName = 'CommentNote',

  render() {
    return (
      <Alert bsStyle="warning">
        <strong>Warning!</strong>
        <br />
        Comments are removed every <strong>24 hours.</strong>
      </Alert>
    );
  }
});

export default CommentNote;
