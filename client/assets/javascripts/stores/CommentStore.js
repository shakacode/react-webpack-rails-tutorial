import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import commentReducer from '../reducers/commentReducer';
import loggerMiddleware from '../middleware/loggerMiddleware';

// applyMiddleware supercharges createStore with middleware:
const createStoreWithMiddleware = applyMiddleware(thunk, loggerMiddleware)(createStore);
export default createStoreWithMiddleware(commentReducer);
