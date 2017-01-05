import requestsManager from 'libs/requestsManager';
import * as actionTypes from '../constants/commentsConstants';

export function setIsFetching() {
  return {
    type: actionTypes.SET_IS_FETCHING,
  };
}

export function setIsSaving() {
  return {
    type: actionTypes.SET_IS_SAVING,
  };
}

export function fetchCommentsSuccess(data) {
  return {
    type: actionTypes.FETCH_COMMENTS_SUCCESS,
    comments: data.comments,
  };
}

export function fetchCommentsFailure(error) {
  return {
    type: actionTypes.FETCH_COMMENTS_FAILURE,
    error,
  };
}

//RB-To-Do : There could be a better way to handle response in submitCommentSuccess instead of defining submitCommentStatusOk
export function submitCommentStatusOk(comment) {
  return {
    type: actionTypes.SUBMIT_COMMENT_STATUS_OK,
    comment,
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
  return (dispatch) => {
    dispatch(setIsFetching());
    return (
      requestsManager
        .fetchEntities()
        .then(res => dispatch(fetchCommentsSuccess(res.data)))
        .catch(error => dispatch(fetchCommentsFailure(error)))
    );
  };
}

export function submitComment(comment) {
  return (dispatch) => {
    dispatch(setIsSaving());
    return (
      requestsManager
        .submitEntity({ comment })
        .then(res => dispatch(submitCommentStatusOk(res.data)))
        .catch(error => dispatch(submitCommentFailure(error)))
    );
  };
}
