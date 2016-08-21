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

  const sagaMiddleware = createSagaMiddleware();

  // https://github.com/zalmoxisus/redux-devtools-extension
  const reduxDevtoolsExtension = (typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f);

  const store = { ...createStore(reducer, initialState,
    compose(applyMiddleware(sagaMiddleware, loggerMiddleware),
      reduxDevtoolsExtension)),
  runSaga: sagaMiddleware.run,
};

  return store;
};
