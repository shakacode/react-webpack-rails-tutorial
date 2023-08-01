import React from 'react';
import Immutable from 'immutable';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from '../../../libs/middlewares/loggerMiddleware';

import reducers, { initialStates } from '../reducers';

export default (props, railsContext) => {
  const initialComments = props.comments;
  const { $$commentsState } = initialStates;

  for (const comment of initialComments) {
    comment.nodeRef = React.createRef(null);
  }

  // initialComments.forEach((comment) => {
  //   comment.nodeRef = React.createRef(null);
  // });
  const initialState = {
    $$commentsStore: $$commentsState.merge({
      $$comments: Immutable.fromJS(initialComments),
    }),
    railsContext,
  };

  // https://github.com/reactjs/react-router-redux
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  // Sync dispatched route actions to the history
  const finalCreateStore = compose(applyMiddleware(thunkMiddleware, loggerMiddleware))(createStore);

  return finalCreateStore(reducer, initialState);
};
