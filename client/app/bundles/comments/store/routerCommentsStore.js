import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

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
  /*  const finalCreateStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  )(createStore);

  return finalCreateStore(reducer, initialState);*/

  const sagaMiddleware = createSagaMiddleware();
  const store = { ...createStore(reducer, initialState,
    compose(applyMiddleware(sagaMiddleware, loggerMiddleware),
      typeof window === 'object' && typeof window.devToolsExtension !==
      'undefined' ? window.devToolsExtension() : f => f)
  ),
  runSaga: sagaMiddleware.run,
};

  return store;
};
