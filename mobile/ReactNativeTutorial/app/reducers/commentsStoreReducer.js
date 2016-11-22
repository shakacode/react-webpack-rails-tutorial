import { fromJS } from 'immutable';

const CREATE = 'COMMENTS_STORE:CREATE';
const REMOVE = 'COMMENTS_STORE:REMOVE';

export const initialState = fromJS({
  meta: {}
});

const create = (state, action) => {
  return state.merge(action.entities);
};

const remove = (state, action) => {
  return state.delete(action.id);
};


export default (state, action) => {
  if (!state) {
    return initialState;
  }

  switch (action.type) {
    case CREATE:
      return create(state, action);
    case REMOVE:
      return remove(state, action);
    default:
      return state;
  }
};

const createComments = (entities) => {
  return {type: CREATE, entities};
};

const removeComment = (id) => {
  return {type: REMOVE, id };
};

export const actions = {
  createComments,
  removeComment,
};
