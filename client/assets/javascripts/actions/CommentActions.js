import alt from '../FluxAlt';
import CommentsManager from '../utils/CommentsManager';

class CommentActions {
  /**
   * Fetch comments from server.
   *
   * @param {String} url - Url used for remote request.
   * @param {Boolean} displaySpinner - Flag whether to show wait spinner
   * @return {void}
   */
  fetchComments(url, displaySpinner) {
    this.dispatch(displaySpinner);
    CommentsManager.fetchComments(url)
      .then((comments) => this.actions.updateComments(comments),
      (errorMessage) => this.actions.updateCommentsError(errorMessage));
  }

  /**
   * A new list of comments is available, refresh the store.
   *
   * @param {Array} comments - New comments to replace those in the store
   * @return {void}
   */
  updateComments(comments) {
    this.dispatch(comments);
  }

  /**
   * An error occurred while fetching comments, dispatch error message.
   *
   * @param {String} errorMessage - Error message received from server.
   * @return {void}
   */
  updateCommentsError(errorMessage) {
    this.dispatch(errorMessage);
  }

  /**
   * A new comment has been submitted to the server, dispatch it.
   *
   * @param {String} comment - New comment from UI.
   * @return {void}
   */
  addComment(comment) {
    this.dispatch(comment);
  }
}

export default alt.createActions(CommentActions);
