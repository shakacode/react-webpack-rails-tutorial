'use strict';

import alt from '../FluxAlt';
import CommentActions from '../actions/CommentActions';
import CommentsManager from '../utils/CommentsManager';

class FormActions {
  /**
   * Change the form layout/mode.
   *
   * @param {Number} formMode
   * @return undefined
   */
  changeFormMode(formMode) {
    this.dispatch(formMode);
  }

  /**
   * Text is being entered in the comment form, update the state.
   *
   * @param {String} comment
   * @return undefined
   */
  updateComment(comment) {
    this.dispatch(comment);
  }

  /**
   * Submit a new comment to the server.
   *
   * @param {String} comment
   * @return undefined
   */
  submitComment(url, comment) {
    this.dispatch();
    CommentsManager.submitComment(url, comment)
      .then((data) => {
        CommentActions.updateComments(data);
      }, (errMessage) => {
        CommentActions.updateCommentsError(errorMessage);
      });
  }
}

export default alt.createActions(FormActions);
