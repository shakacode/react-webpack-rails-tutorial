import alt from '../FluxAlt';
import CommentActions from '../actions/CommentActions';
import CommentsManager from '../utils/CommentsManager';

class FormActions {
  /**
   * Action triggered on a failed fetchComments.
   *
   * @param {String} errorMessage
   * @return undefined
   */
  changeFormMode(comment) {
    this.dispatch(comment);
  }

  /**
   * Action triggered on a failed fetchComments.
   *
   * @param {String} errorMessage
   * @return undefined
   */
  updateComment(comment) {
    this.dispatch(comment);
  }

  /**
   * Action triggered 
   *
   * @param {Array} comments
   * @return undefined
   */
  submitComment(url, comment) {
    this.dispatch();
    //CommentsManager.fetchComments(url)
    //  .then((comments) => this.actions.updateComments(comments),
    //        (errorMessage) => this.actions.updateCommentsError(errorMessage));
    CommentsManager.submitComment(url, comment)
      .then((data) => {
        CommentActions.updateComments(data);
        //var comments = this.state.data;
        //var newComments = React.addons.update(comments, { $push: [comment] } );
        //this.setState({ajaxSending: false, data: newComments, formData: this.emptyFormData });
      }, (xhr, status, err) => {
        console.log("error");
        //this.logError(xhr, status, err);
        //this.setState({ajaxSending: false});
      });
  }
}

export default alt.createActions(FormActions);
