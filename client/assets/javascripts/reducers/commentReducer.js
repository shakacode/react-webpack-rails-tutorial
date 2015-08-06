import * from '../constants/ActionTypes';

import Immutable from 'immutable';

const initialState = Immutable.Map({
  comments: [],
  ajaxCounter: 0,
  fetchCommentError: '',
  submitCommentError: '',
});

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS:
      return state.merge({ comments: action.comments, fetchCommentError: '' });
    case FETCH_COMMENTS_FAILURE:
      return state.merge({ fetchCommentError: action.error });
    case SUBMIT_COMMENT_SUCCESS:
      return state.withMutatations(mState => {
        mState.updateIn(['comments'], comments => comments.unshift(action.comment)).
          merge({ submitCommentError: '' });
      });
    case SUBMIT_COMMENT_FAILURE:
      return state.merge({ submitCommentError: action.error });
    case INCREMENT_AJAX_COUNTER:
      return state.merge({ ajaxCounter: state.get('ajaxCounter') + 1 });
    case DECREMENT_AJAX_COUNTER:
      return state.merge({ ajaxCounter: state.get('ajaxCounter') - 1 });
    default:
      return state;
  }
}
