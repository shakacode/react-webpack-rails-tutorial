/* eslint new-cap: 0 */

import Immutable from 'immutable';

import * as actionTypes from '../constants/commentsConstants';

export const $$initialState = Immutable.fromJS({
  $$comments: [],
  fetchCommentError: null,
  submitCommentError: null,
  isFetching: false,
  isSaving: false,
});

export default function commentsReducer($$state = $$initialState, action = null) {
  const { type, comment, comments, error } = action;

  switch (type) {

    case actionTypes.FETCH_COMMENTS_SUCCESS: {
      return $$state.merge({
        $$comments: comments,
        fetchCommentError: null,
        isFetching: false,
      });
    }

    case actionTypes.FETCH_COMMENTS_FAILURE: {
      return $$state.merge({
        fetchCommentError: error,
        isFetching: false,
      });
    }

    case actionTypes.SUBMIT_COMMENT_SUCCESS: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$comments'],
            $$comments => $$comments.unshift(Immutable.fromJS(comment))
          )
          .merge({
            submitCommentError: null,
            isSaving: false,
          })
      ));
    }

    case actionTypes.SUBMIT_COMMENT_FAILURE: {
      return $$state.merge({
        submitCommentError: error,
        isSaving: false,
      });
    }

    case actionTypes.SET_IS_FETCHING: {
      return $$state.merge({
        isFetching: true,
      });
    }

    case actionTypes.SET_IS_SAVING: {
      return $$state.merge({
        isSaving: true,
      });
    }

    default: {
      return $$state;
    }
  }
}
