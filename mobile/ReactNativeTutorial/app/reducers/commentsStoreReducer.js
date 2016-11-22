import { fromJS } from 'immutable';

const CREATE = 'COMMENTS_STORE:CREATE';
const REMOVE = 'COMMENTS_STORE:REMOVE';
const SET_LOADING = 'COMMENTS_STORE:SET_LOADING';

export const initialState = fromJS({
  meta: {
    loading: false,
  },
});

const create = (state, action) => {
  return state.merge(action.entities);
};

const remove = (state, action) => {
  return state.delete(action.id);
};

const setLoading = (state, action) => {
  return state.setIn(['meta', 'loading'], action.loading);
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
    case SET_LOADING:
      return setLoading(state, action);
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

const setLoadingComments = (loading) => {
  return {type: SET_LOADING, loading};
};

export const actions = {
  createComments,
  removeComment,
  setLoadingComments,
};
