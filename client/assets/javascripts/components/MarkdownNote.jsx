import React from 'react';

const MarkdownNote = React.createClass({
  displayName = 'MarkdownNote',

  render() {
    return (
      <Alert bsStyle="info">
        <strong>Markdown is enabled!</strong>
        <br />
        You can use Markdown. Check Docs <a href="https://guides.github.com/features/mastering-markdown/" class="alert-link">here.</a>
      </Alert>
    );
  }
});

export default MarkdownNote;
