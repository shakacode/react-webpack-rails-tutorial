import React from 'react';

const MarkdownNote = React.createClass({
  displayName = 'MarkdownNote',

  render() {
    const alertInstance = (
      return (
        <Alert bsStyle="info">
          <p><strong>Markdown is enabled!</strong></p>
          <br />
          <p>You can use Markdown. Check Docs <a href="https://markdown-guide.readthedocs.org/en/latest/basics.html" class="alert-link">here.</a></p>
        </Alert>
      );
    );
  }
});

export default MarkdownNote;

//React.render(
// alertInstance,
//  document.getElementById("note")
//);
