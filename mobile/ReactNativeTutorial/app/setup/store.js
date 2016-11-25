import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import loggerMiddleware from './loggerMiddleware';
import appReducer, { initialState } from '../reducers';

let composedStore;
if (__DEV__) {
  composedStore = compose(applyMiddleware(loggerMiddleware, thunk));
} else {
  composedStore = compose(applyMiddleware(thunk));
}
const store = composedStore(createStore)(appReducer, initialState);

export default store;
