import configureMockStore from 'redux-mock-store';
import { mockEffectsMiddleware } from 'ReactNativeTutorial/app/setup/effectsMiddleware';

import { initialState } from 'ReactNativeTutorial/app/reducers';

export const createMockStore = configureMockStore([mockEffectsMiddleware]);

export default () => createMockStore(initialState);
