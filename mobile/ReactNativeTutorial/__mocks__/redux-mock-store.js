import configureMockStore from 'redux-mock-store';
import { initialState as reduxInitialState } from 'ReactNativeTutorial/app/reducers';

import mockThunkMiddleware from './mockThunkMiddleware';

export const createStoreFromState = configureMockStore([mockThunkMiddleware]);
export const initialState = reduxInitialState;

export default () => createStoreFromState(initialState);
