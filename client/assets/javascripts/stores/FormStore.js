'use strict';

import alt from '../FluxAlt';
import FormActions from '../actions/FormActions';
import CommentActions from '../actions/CommentActions';

const emptyComment = { author: "", text: "" };

class FormStore {
  constructor() {
    this.mode = 0;
    this.comment = emptyComment;
    this.ajaxSending = false;
    this.bindListeners({
      handleChangeFormMode: FormActions.CHANGE_FORM_MODE,
      handleUpdateComment: FormActions.UPDATE_COMMENT,
      handleSubmitComment: FormActions.SUBMIT_COMMENT,
      handleFetchComments: CommentActions.FETCH_COMMENTS,
      handleUpdateComments: CommentActions.UPDATE_COMMENTS,
      handleUpdateCommentsError: CommentActions.UPDATE_COMMENTS_ERROR
    });
  }

  handleChangeFormMode(mode) {
    this.mode = mode;
  }

  handleUpdateComment(comment) {
    this.comment = comment;
  }

  handleSubmitComment(comment) {
    this.ajaxSending = true;
    this.comment = emptyComment;
  }

  handleFetchComments(displaySpinner) {
    if (displaySpinner) {
      this.ajaxSending = true;
    }
  }

  handleUpdateComments(comments) {
    this.ajaxSending = false;
  }

  handleUpdateCommentsError(comments) {
    this.ajaxSending = false;
  }
}

export default alt.createStore(FormStore, 'FormStore');

