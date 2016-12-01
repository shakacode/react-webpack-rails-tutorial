import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import loggerMiddleware from './loggerMiddleware';
import appReducer, { initialState } from '../reducers';

const call = (f, ...args) => f(...args);
const thunkMiddleware = thunk.withExtraArgument(call);
const middlewares = __DEV__ ? [thunkMiddleware, loggerMiddleware] : [thunkMiddleware];
export default createStore(appReducer, initialState, applyMiddleware(...middlewares));
