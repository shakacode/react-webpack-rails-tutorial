import { fromJS } from 'immutable';

const CREATE = 'COMMENTS_STORE:CREATE';

export const initialState = fromJS({
  meta: {}
});

const create = (state, action) => {
  return state.merge(action.entities);
};

export default (state, action) => {
  if (!state) {
    return initialState;
  }

  switch (action.type) {
    case CREATE:
      return create(state, action);
    default:
      return state;
  }
};

const createComments = (entities) => {
  return {type: CREATE, entities};
};

export const actions = {
  createComments,
};
