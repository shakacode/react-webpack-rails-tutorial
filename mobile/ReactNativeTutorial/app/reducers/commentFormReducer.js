import { fromJS } from 'immutable';

const UPDATE = 'COMMENT_FORM:UPDATE';
const RESET = 'COMMENT_FORM:RESET';

export const initialState = fromJS({
  meta: {},
});

const update = (state, action) => state.merge(action.payload);

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return update(state, action);
    case RESET: return initialState;
    default:
      return state;
  }
};

const updateCommentForm = (payload) => ({ type: UPDATE, payload });
const resetCommentForm = () => ({ type: RESET });

export const actions = {
  updateCommentForm,
  resetCommentForm,
};
