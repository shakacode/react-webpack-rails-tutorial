import CommentsManager from '../utils/CommentsManager';
import * as actionTypes from '../constants/ActionTypes';

export function incrementAjaxCounter() {
  return {
    type: actionTypes.INCREMENT_AJAX_COUNTER,
  };
}

export function decrementAjaxCounter() {
  return {
    type: actionTypes.DECREMENT_AJAX_COUNTER,
  };
}

export function fetchCommentsSuccess(comments) {
  return {
    type: actionTypes.FETCH_COMMENTS_SUCCESS,
    comments,
  };
}

export function fetchCommentsFailure(error) {
  return {
    type: actionTypes.FETCH_COMMENTS_FAILURE,
    error,
  };
}

export function submitCommentSuccess(comment) {
  return {
    type: actionTypes.SUBMIT_COMMENT_SUCCESS,
    comment,
  };
}

export function submitCommentFailure(error) {
  return {
    type: actionTypes.SUBMIT_COMMENT_FAILURE,
    error,
  };
}

export function fetchComments() {
  return dispatch => {
    return (
      CommentsManager.fetchComments()
        .then(res => dispatch(fetchCommentsSuccess(res.data)))
        .catch(res => dispatch(fetchCommentsFailure(res.data)))
    );
  };
}

function dispatchDecrementAjaxCounter(dispatch) {
  return dispatch(decrementAjaxCounter());
}

export function submitComment(comment) {
  return dispatch => {
    dispatch(incrementAjaxCounter());
    return (
      CommentsManager.submitComment(comment)
        .then(res => dispatch(submitCommentSuccess(res.data)))
        .catch(res => dispatch(submitCommentFailure(res.data)))
        .then(() => dispatchDecrementAjaxCounter(dispatch))
    );
  };
}
