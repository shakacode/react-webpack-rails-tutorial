import { applyMiddleware, compose, createStore } from 'redux';
import effectsMiddleware from 'redux-thunk-effects';
import loggerMiddleware from './loggerMiddleware';
import appReducer, { initialState } from '../reducers';

let composedStore;
if (__DEV__) {
  composedStore = compose(applyMiddleware(loggerMiddleware, effectsMiddleware));
} else {
  composedStore = compose(applyMiddleware(effectsMiddleware));
}
const store = composedStore(createStore)(appReducer, initialState);

export default store;
