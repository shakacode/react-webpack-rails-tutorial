import alt from '../FluxAlt';
import CommentsFetcher from '../utils/CommentsFetcher';

class CommentActions {
  /**
   * Action triggered by CommentBox component after being mounted.
   *
   * @param {String} url
   * @return undefined
   */
  fetchComments(url) {
    this.dispatch(); // we dispatch an event here so we can have a "loading" state

    CommentsFetcher.fetch(url)
      .then((comments) => this.actions.updateComments(comments),
            (errorMessage) => this.actions.commentsFailed(errorMessage));
      //.catch((errorMessage) => this.actions.commentsFailed(errorMessage));
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
  commentsFailed(errorMessage) {
    this.dispatch(errorMessage);
  }
}

export default alt.createActions(CommentActions);
