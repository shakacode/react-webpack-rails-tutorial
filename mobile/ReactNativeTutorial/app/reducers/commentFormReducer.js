import { fromJS } from 'immutable';

const UPDATE = 'COMMENT_FORM:UPDATE';
const RESET = 'COMMENT_FORM:RESET';

export const initialState = fromJS({
  meta: {}
});

const update = (state, action) => {
  return state.merge(action.payload);
};

export default (state, action) => {
  if (!state) {
    return initialState;
  }

  switch (action.type) {
    case UPDATE:
      return update(state, action);
    case RESET: return initialState;
    default:
      return state;
  }
};

const updateCommentForm = (payload) => {
  return {type: UPDATE, payload};
};

const resetCommentForm = () => {
  return {type: RESET};
};

export const actions = {
  updateCommentForm,
  resetCommentForm
};
