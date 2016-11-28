import createDefaultStore from 'redux-mock-store';
import { mockCalls, resetMockCalls }
  from 'ReactNativeTutorial/app/setup/effectCreators/mock';
import * as actions from 'ReactNativeTutorial/app/bundles/comments/effects';

describe('fetch', () => {
  let store;

  beforeEach(() => {
    store = createDefaultStore();
  });

  afterEach(() => {
    resetMockCalls();
  });

  describe('successful fetch', () => {
    it('saves comments into the store', async () => {
      const response = {
        entities: {
          comments: {
            1: { id: 1, author: 'Alexey', text: 'Just some random comment' },
            2: { id: 2, author: 'Justin', text: 'Another random comment' },
          },
        },
      };
      mockCalls(response);
      await store.dispatch(actions.fetch());
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('failing fetch', () => {
    it('dispatches an action with error', async () => {
      mockCalls(() => { throw new Error('Invalid Json'); });
      await store.dispatch(actions.fetch());
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
