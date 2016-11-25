import { applyMiddleware, compose, createStore } from 'redux';
import loggerMiddleware from './loggerMiddleware';
import { effectsMiddleware } from './effectsMiddleware';
import appReducer, { initialState } from '../reducers';

let composedStore;
if (__DEV__) {
  composedStore = compose(applyMiddleware(loggerMiddleware, effectsMiddleware));
} else {
  composedStore = compose(applyMiddleware(effectsMiddleware));
}
const store = composedStore(createStore)(appReducer, initialState);

export default store;
