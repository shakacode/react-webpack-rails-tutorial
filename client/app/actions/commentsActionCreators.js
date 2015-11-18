import commentsManager from '../utils/commentsManager';
import * as actionTypes from '../constants/commentsConstants';

const minimumDelay = 500;

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
    dispatch(setIsFetching());
    return (
        commentsManager
            .fetchComments()
            .then(res => dispatch(fetchCommentsSuccess(res.data)))
            .catch(res => dispatch(fetchCommentsFailure(res.data)))
    );
  };
}

export function submitComment(comment) {
  const startTime = (new Date()).getTime();
  return dispatch => {
    dispatch(setIsSaving());
    return (
      commentsManager
        .submitComment(comment)
        .then(res => {
          const result = res.data;
          const successTime = (new Date()).getTime();
          const timeDiff = successTime - startTime;
          if (timeDiff < minimumDelay) {
            setTimeout(dispatch, minimumDelay - timeDiff, submitCommentSuccess(result));
          } else {
            dispatch(submitCommentSuccess(result));
          }
        })
        .catch(res => dispatch(submitCommentFailure(res.data)))
    );
  };
}
