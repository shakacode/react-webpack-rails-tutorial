import alt from '../FluxAlt';
import CommentActions from '../actions/CommentActions';

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
    // Reset the array while we're fetching new comments
    // so React can render a spinner.
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

export default alt.createStore(CommentStore, 'CommentStore');
