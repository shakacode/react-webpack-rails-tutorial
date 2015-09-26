import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from '../middlewares/loggerMiddleware';
import reducers from '../reducers';

// applyMiddleware supercharges createStore with middleware:
const reducer = combineReducers(reducers);
const composedStore = compose(
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
const storeCreator = composedStore(createStore);
const store = storeCreator(reducer);

export default store;
