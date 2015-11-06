/* eslint new-cap: 0 */

import Immutable from 'immutable';

import * as actionTypes from '../constants/commentsConstants';

export const $$initialState = Immutable.fromJS({
  $$comments: [],
  ajaxCounter: 0,
  fetchCommentError: null,
  submitCommentError: null,
});

export default function commentsReducer($$state = $$initialState, action = null) {
  const { type, comment, comments, error } = action;

  switch (type) {

    case actionTypes.FETCH_COMMENTS_SUCCESS: {
      return $$state.merge({
        $$comments: comments,
        fetchCommentError: null,
      });
    }

    case actionTypes.FETCH_COMMENTS_FAILURE: {
      return $$state.merge({
        fetchCommentError: error,
      });
    }

    case actionTypes.SUBMIT_COMMENT_SUCCESS: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$comments'],
            $$comments => $$comments.push(Immutable.fromJS(comment))
          )
          .merge({ submitCommentError: null })
      ));
    }

    case actionTypes.SUBMIT_COMMENT_FAILURE: {
      return $$state.merge({
        submitCommentError: error,
      });
    }

    case actionTypes.INCREMENT_AJAX_COUNTER: {
      return $$state.merge({
        ajaxCounter: $$state.get('ajaxCounter') + 1,
      });
    }

    case actionTypes.DECREMENT_AJAX_COUNTER: {
      return $$state.merge({
        ajaxCounter: $$state.get('ajaxCounter') - 1,
      });
    }

    default: {
      return $$state;
    }
  }
}
