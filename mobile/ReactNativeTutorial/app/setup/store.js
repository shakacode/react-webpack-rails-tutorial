import { applyMiddleware, createStore } from 'redux';
import effectsMiddleware from 'redux-thunk-effects';
import loggerMiddleware from './loggerMiddleware';
import appReducer, { initialState } from '../reducers';

const middlewares = __DEV__ ? [effectsMiddleware, loggerMiddleware] : [effectsMiddleware];
export default createStore(appReducer, initialState, applyMiddleware(...middlewares));
