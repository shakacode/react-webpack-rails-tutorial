var alt = require('../FluxAlt');
var CommentActions = require('../actions/CommentActions');

class CommentStore {
  constructor() {
    this.comments = [];
    this.errorMessage = null;
    this.bindListeners({
      handleFetchComments: CommentActions.FETCH_COMMENTS,
      handleUpdateComments: CommentActions.UPDATE_COMMENTS,
      handleCommentsFailed: CommentActions.COMMENTS_FAILED
    });
  }

  handleFetchComments(comment) {
    // Reset the array while we're fetching new locations
    // so React can render a spinner since the data is empty.
    this.comments = [];
  }

  handleUpdateComments(comments) {
    this.comments = comments
    this.errorMessage = null;
  }

  handleCommentsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }
}

module.exports = alt.createStore(CommentStore, 'CommentStore');
