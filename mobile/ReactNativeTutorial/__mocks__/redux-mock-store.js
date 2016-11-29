import configureMockStore from 'redux-mock-store';
import { mockEffectsMiddleware } from 'redux-thunk-effects';

import { initialState as reduxInitialState } from 'ReactNativeTutorial/app/reducers';

export const createStoreFromState = configureMockStore([mockEffectsMiddleware]);
export const initialState = reduxInitialState;

export default () => createStoreFromState(initialState);
