import alt from '../FluxAlt';
import React from 'react/addons';
import CommentActions from '../actions/CommentActions';

class CommentStore {
  constructor() {
    this.comments = [];
    this.errorMessage = null;
    this.bindListeners({
      handleFetchComments: CommentActions.FETCH_COMMENTS,
      handleUpdateComments: CommentActions.UPDATE_COMMENTS,
      handleUpdateCommentsError: CommentActions.UPDATE_COMMENTS_ERROR
    });
  }

  handleFetchComments() {
    // Reset the array while we're fetching new comments
    // so React can render a spinner.
    this.comments = [];
  }

  handleUpdateComments(comments) {
    this.comments = comments
    this.errorMessage = null;
  }

  handleUpdateCommentsError(errorMessage) {
    this.errorMessage = errorMessage;
  }
}

export default alt.createStore(CommentStore, 'CommentStore');
