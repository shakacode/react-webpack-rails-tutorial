/* eslint new-cap: 0 */

import * as actionTypes from '../constants/ActionTypes';

import { Map, List } from 'immutable';

const initialState = Map({
  comments: List(),
  ajaxCounter: 0,
  fetchCommentError: '',
  submitCommentError: '',
});

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_COMMENTS_SUCCESS:
      return state.merge({comments: action.comments, fetchCommentError: ''});
    case actionTypes.FETCH_COMMENTS_FAILURE:
      return state.merge({fetchCommentError: action.error});
    case actionTypes.SUBMIT_COMMENT_SUCCESS:
      return state.withMutations(mState => {
        mState
          .updateIn(['comments'], comments => comments.push(Map(action.comment)))
          .merge({submitCommentError: ''});
      });

    case actionTypes.SUBMIT_COMMENT_FAILURE:
      return state.merge({submitCommentError: action.error});
    case actionTypes.INCREMENT_AJAX_COUNTER:
      return state.merge({ajaxCounter: state.get('ajaxCounter') + 1});
    case actionTypes.DECREMENT_AJAX_COUNTER:
      return state.merge({ajaxCounter: state.get('ajaxCounter') - 1});
    default:
      return state;
  }
}
