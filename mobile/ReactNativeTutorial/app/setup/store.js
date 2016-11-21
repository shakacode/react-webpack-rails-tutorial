import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import loggerMiddleware from './loggerMiddleware';
import appReducer, { initialState } from '../reducers';
import appSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

let composedStore;
if (__DEV__) {
  composedStore = compose(applyMiddleware(sagaMiddleware, loggerMiddleware));
} else {
  composedStore = compose(applyMiddleware(sagaMiddleware));
}
const store = composedStore(createStore)(appReducer, initialState);

sagaMiddleware.run(appSaga);

export default store;
