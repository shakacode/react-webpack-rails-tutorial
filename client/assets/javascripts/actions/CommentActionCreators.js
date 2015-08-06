import CommentsManager from '../utils/CommentsManager';
import * from '../constants/ActionTypes';

export function incrementAjaxCounter() {
  return {
    type: INCREMENT_AJAX_COUNTER
  }
}

export function decrementAjaxCounter() {
  return {
    type: DECREMENT_AJAX_COUNTER
  }
}

export function fetchCommentsSuccess(comments) {
  return {
    type: FETCH_COMMENTS_SUCCESS,
    comments
  };
}

export function fetchCommentsFailure(error) {
  return {
    type: FETCH_COMMENTS_FAILURE,
    error
  };
}

export function submitCommentSuccess(comment) {
  return {
    type: SUBMIT_COMMENT_SUCCESS,
    comment
  };
}

export function submitCommentFailure(error) {
  return {
    type: SUBMIT_COMMENT_FAILURE,
    error
  }
}

export function fetchComments() {
  return function(dispatch) {
    return CommentsManager.fetchComments().then(
      comments => dispatch(fetchCommentsSuccess(comments)),
      error => dispatch(fetchCommentsFailure(error))
    );
  }
}

export function submitComment(comment) {
  return function(dispatch) {
    dispatch(incrementAjaxCounter());
    return CommentsManager.submitComment(comment).then(
        comment => dispatch(submitCommentSuccess(comment),
        error => dispatch(submitCommentFailure(error))
    ).then(() => dispatch(decrementAjaxCounter()));
  }
}
