import alt from '../FluxAlt';
import FormActions from '../actions/FormActions';

const emptyComment = { author: "", text: "" };

class FormStore {
  constructor() {
    this.mode = 0;
    this.comment = emptyComment;
    this.ajaxSending = false;
    this.errorMessage = null;
    this.bindListeners({
      handleChangeFormMode: FormActions.CHANGE_FORM_MODE,
      handleUpdateComment: FormActions.UPDATE_COMMENT,
      handleSubmitComment: FormActions.SUBMIT_COMMENT,
    });
  }

  handleChangeFormMode(mode) {
    this.mode = mode;
  }

  handleUpdateComment(comment) {
    this.comment = comment;
  }

  handleSubmitComment(comment) {
    this.comment = emptyComment;
  }
}

export default alt.createStore(FormStore, 'FormStore');

