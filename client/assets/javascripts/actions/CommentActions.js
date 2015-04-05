import alt from '../FluxAlt';
import CommentsManager from '../utils/CommentsManager';

class CommentActions {
  /**
   * Action triggered by CommentBox component after being mounted.
   *
   * @param {String} url
   * @return undefined
   */
  fetchComments(url) {
    this.dispatch(); // we dispatch an event here so we can have a "loading" state

    CommentsManager.fetchComments(url)
      .then((comments) => this.actions.updateComments(comments),
            (errorMessage) => this.actions.updateCommentsError(errorMessage));
  }

  /**
   * Action triggered on a successful fetchComments.
   *
   * @param {Array} comments
   * @return undefined
   */
  updateComments(comments) {
    this.dispatch(comments);
  }

  /**
   * Action triggered on a failed fetchComments.
   *
   * @param {String} errorMessage
   * @return undefined
   */
  updateCommentsError(errorMessage) {
    this.dispatch(errorMessage);
  }

  /**
   * Action triggered after submitting a new comment.
   *
   * @param {String} comment
   * @return undefined
   */
  addComment(comment) {
    this.dispatch(comment);
  }
}

export default alt.createActions(CommentActions);
