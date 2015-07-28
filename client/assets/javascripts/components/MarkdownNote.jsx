import React from 'react';

const MarkdownNote = React.createClass({
  displayName = 'MarkdownNote',

  render() {
    return (
      <Alert bsStyle="info">
        <strong>Markdown is enabled!</strong>
        <br />
        You can use Markdown. Check Docs <a href="https://markdown-guide.readthedocs.org/en/latest/basics.html" class="alert-link">here.</a>
      </Alert>
    );
  }
});

export default MarkdownNote;
