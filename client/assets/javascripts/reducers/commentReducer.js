import * as actionTypes from '../constants/ActionTypes';

import { Map } from 'immutable';

const initialState = Map({
  comments: [],
  ajaxCounter: 0,
  fetchCommentError: '',
  submitCommentError: '',
});

export default function comments(state = initialState, action) {
  switch (action.type) {
  case actionTypes.FETCH_COMMENTS_SUCCESS:
    return state.merge({ comments: action.comments, fetchCommentError: '' });
  case actionTypes.FETCH_COMMENTS_FAILURE:
    return state.merge({ fetchCommentError: action.error });
  case actionTypes.SUBMIT_COMMENT_SUCCESS:
    return state.withMutatations(mState => {
      mState.updateIn(['comments'], comments => comments.unshift(action.comment)).    // Seems to me this is a mutation, for `comments` we should use List type instead
        merge({ submitCommentError: '' });
    });
  case actionTypes.SUBMIT_COMMENT_FAILURE:
    return state.merge({ submitCommentError: action.error });
  case actionTypes.INCREMENT_AJAX_COUNTER:
    return state.merge({ ajaxCounter: state.get('ajaxCounter') + 1 });
  case actionTypes.DECREMENT_AJAX_COUNTER:
    return state.merge({ ajaxCounter: state.get('ajaxCounter') - 1 });
  default:
    return state;
  }
}
