import * from '../constants/ActionTypes';

const initialState = {
  comments: [],
  ajaxCounter: 0,
  fetchCommentError: '',
  submitCommentError: ''
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS:
      return Object.assign({}, state, { comments: action.comments, fetchCommentError: '' });
    case FETCH_COMMENTS_FAILURE:
      return Object.assign({}, state, { fetchCommentError: action.error });
    case SUBMIT_COMMENT_SUCCESS:
      return Object.assign({}, state,
        { comments: action.comments.unshift(action.comment), submitCommentError: '' });
    case SUBMIT_COMMENT_FAILURE:
      return Object.assign({}, state, { submitCommentError: action.error });
    case INCREMENT_AJAX_COUNTER:
      return Object.assign({}, state, { ajaxCounter: state.ajaxCounter + 1 });
    case DECREMENT_AJAX_COUNTER:
      return Object.assign({}, state, { ajaxCounter: state.ajaxCounter - 1 });
    default:
      return state;
  }
}
