import alt from '../FluxAlt';
import CommentsManager from '../utils/CommentsManager';

class CommentActions {
  /**
   * Fetch comments from server.
   *
   * @param {String} url
   * @param {Boolean} displaySpinner
   * @return undefined
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
   * @param {Array} comments
   * @return undefined
   */
  updateComments(comments) {
    this.dispatch(comments);
  }

  /**
   * An error occurred while fetching comments, dispatch error message.
   *
   * @param {String} errorMessage
   * @return undefined
   */
  updateCommentsError(errorMessage) {
    this.dispatch(errorMessage);
  }

  /**
   * A new comment has been submitted to the server, dispatch it.
   *
   * @param {Array} comment
   * @return undefined
   */
  addComment(comment) {
    this.dispatch(comment);
  }

}

export default alt.createActions(CommentActions);
