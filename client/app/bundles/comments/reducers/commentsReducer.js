/* eslint new-cap: 0 */

import Immutable from 'immutable';

import * as actionTypes from '../constants/commentsConstants';

export const $$initialState = Immutable.fromJS({
  $$comments: [],
  fetchCommentError: null,
  submitCommentError: null,
  isFetching: false,
  isSaving: false,
  locale: null,
});

export default function commentsReducer($$state = $$initialState, action = null) {
  const { type, comment, comments, error, locale } = action;

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

    case actionTypes.MESSAGE_RECEIVED: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$comments'],
            $$comments => ($$comments.findIndex(com => com.get('id') === comment.get('id')) === -1 ? $$comments.unshift(Immutable.fromJS(comment)) : $$comments),
          )
      ));
    }

    case actionTypes.SUBMIT_COMMENT_SUCCESS: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$comments'],
            $$comments => $$comments.unshift(Immutable.fromJS(comment)),
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

    case actionTypes.SET_LOCALE: {
      return $$state.merge({
        locale,
      });
    }

    default: {
      return $$state;
    }
  }
}
