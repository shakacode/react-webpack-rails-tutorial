import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

// Smth wrong with this one, off for now
import loggerMiddleware from '../middleware/loggerMiddleware';

// applyMiddleware supercharges createStore with middleware:
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
export default createStoreWithMiddleware(combineReducers(reducers));
