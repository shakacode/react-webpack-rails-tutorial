import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from '../middlewares/loggerMiddleware';
import reducers from '../reducers';
import { initalStates } from '../reducers';

export default props => {
  const { $$commentsState } = initalStates;
  const initialState = {
    $$commentsStore: $$commentsState.merge({
      $$comments: props,
    }),
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );

  return composedStore(createStore)(reducer, initialState);
};
