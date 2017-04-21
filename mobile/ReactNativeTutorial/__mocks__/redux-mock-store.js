import { applyMiddleware } from 'redux';
import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

import { initialState } from 'ReactNativeTutorial/app/reducers';
import appSaga from 'ReactNativeTutorial/app/setup/sagas';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureMockStore([sagaMiddleware]);
const store = mockStore(initialState);
sagaMiddleware.run(appSaga);

export default store;
