import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from 'libs/middlewares/loggerMiddleware';

import reducers, { initialStates } from '../reducers';

export default (props, railsContext) => {
  const initialComments = props.comments;
  const { $$commentsState } = initialStates;
  const initialState = {
    $$commentsStore: $$commentsState.merge({
      $$comments: initialComments,
    }),
    railsContext,
  };

  // https://github.com/reactjs/react-router-redux
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  // Sync dispatched route actions to the history
  const finalCreateStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
  )(createStore);

  return finalCreateStore(reducer, initialState);
};
