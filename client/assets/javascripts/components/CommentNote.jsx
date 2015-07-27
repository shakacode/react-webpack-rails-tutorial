import React from 'react';

const CommentNote = React.createClass({
  displayName = 'CommentNote',

  render() {
    const alertInstance = (
      return (
        <Alert bsStyle="danger">
          <p><strong>Warning!</strong></p>
          <br />
          <p>Comments are living only 24 hours.</p><br />
          <p>After this, it will be <strong>removed.</strong></p>
        </Alert>
      );
    );
  }
});

export default CommentNote;

//React.render(
//  alertInstance,
//  document.getElementById("note")
//);
