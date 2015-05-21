import alt from '../FluxAlt';
import CommentActions from '../actions/CommentActions';
import CommentsManager from '../utils/CommentsManager';

class FormActions {
  /**
   * Text is being entered in the comment form, update the state.
   *
   * @param {String} comment - Comment to update from form input.
   * @return {void}
   */
  updateComment(comment) {
    this.dispatch(comment);
  }

  /**
   * Submit a new comment to the server.
   *
   * @param {String} url - Url used for remote request to sumbmit the comment.
   * @param {String} comment - New comment from UI to send to the server.
   * @return {void}
   */
  submitComment(url, comment) {
    this.dispatch();
    CommentsManager.submitComment(url, comment)
      .then((returnedComment) => {
        CommentActions.addComment(returnedComment);
      },

      (errorMessage) => {
        CommentActions.updateCommentsError(errorMessage);
      });
  }
}

export default alt.createActions(FormActions);
