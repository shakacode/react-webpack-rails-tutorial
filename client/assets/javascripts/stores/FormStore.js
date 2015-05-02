import alt from '../FluxAlt';
import FormActions from '../actions/FormActions';
import CommentActions from '../actions/CommentActions';

const emptyComment = {author: '', text: ''};

class FormStore {
  constructor() {
    this.mode = 0;
    this.comment = emptyComment;
    this.ajaxSending = false;
    this.bindListeners({
      handleUpdateComment: FormActions.UPDATE_COMMENT,
      handleSubmitComment: FormActions.SUBMIT_COMMENT,
      handleFetchComments: CommentActions.FETCH_COMMENTS,
      handleUpdateComments: CommentActions.UPDATE_COMMENTS,
      handleUpdateCommentsError: CommentActions.UPDATE_COMMENTS_ERROR,
      handleAddComment: CommentActions.ADD_COMMENT
    });
  }

  handleUpdateComment(comment) {
    this.comment = comment;
  }

  handleSubmitComment() {
    this.ajaxSending = true;
    this.comment = emptyComment;
  }

  handleFetchComments(displaySpinner) {
    if (displaySpinner) {
      this.ajaxSending = true;
    }
  }

  handleUpdateComments() {
    this.ajaxSending = false;
  }

  handleUpdateCommentsError() {
    this.ajaxSending = false;
  }

  handleAddComment() {
    this.ajaxSending = false;
  }
}

export default alt.createStore(FormStore, 'FormStore');
