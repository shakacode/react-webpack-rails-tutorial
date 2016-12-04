import { Map } from 'immutable';
import { combineReducers } from 'redux-immutable';
import commentsStoreReducer, {
  initialState as commentsStoreInitialState,
  actions as commentsStoreActions,
} from './commentsStoreReducer';

import commentFormReducer, {
  initialState as commentFormInitialState,
  actions as commentFormActions,
} from './commentFormReducer';


export default combineReducers({
  commentsStore: commentsStoreReducer,
  commentForm: commentFormReducer,
});

export const initialState = Map({
  commentsStore: commentsStoreInitialState,
  commentForm: commentFormInitialState,
});

export const actions = {
  ...commentsStoreActions,
  ...commentFormActions,
};
