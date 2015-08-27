import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import loggerMiddleware from '../middleware/loggerMiddleware';

// applyMiddleware supercharges createStore with middleware:
const createStoreWithMiddleware = applyMiddleware(thunk, loggerMiddleware)(createStore);
export default createStoreWithMiddleware(combineReducers(reducers));
