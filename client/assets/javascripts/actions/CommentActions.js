var alt = require('../FluxAlt');
var CommentsFetcher = require('../utils/CommentsFetcher');

class CommentActions {
  // Triggered by CommentBox component after being mounted.
  fetchComments(url) {
    this.dispatch(); // we dispatch an event here so we can have a "loading" state

    CommentsFetcher.fetch(url)
      .then((comments) => {
        this.actions.updateComments(comments); // trigger updateComments action
      });
      .catch((errorMessage) => {
        this.actions.commentsFailed(errorMessage); // trigger commentsFailed action
      });
  }

  // Triggered on a successful fetchComments.
  updateComments(comments) {
    this.dispatch(comments);
  }

  // Triggered on a failed fetchComments.
  commentsFailed(errorMessage) {
    this.dispatch(errorMessage);
  }
}

module.exports = alt.createActions(CommentActions);
