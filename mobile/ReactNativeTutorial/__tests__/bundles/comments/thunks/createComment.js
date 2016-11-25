import { fromJS } from 'Immutable';
import { createMockStore } from 'redux-mock-store';
import { mockCalls, resetMockCalls }
  from 'ReactNativeTutorial/app/setup/effectCreators/mock';
import * as actions from 'ReactNativeTutorial/app/bundles/comments/effects';

describe('createComment', () => {
  afterEach(() => {
    resetMockCalls();
  });

  it('creates a comment in the store and sends request to api', async() => {
    const data = {
      commentsStore: {},
      commentForm: { author: 'Alexey', text: 'Random comment' },
    };
    const store = createMockStore(fromJS(data));
    const response = {
      entities: {
        comments: {
          1: { id: 1, author: 'Alexey', text: 'Random comment' },
        },
      },
    };
    mockCalls(null, response);
    await store.dispatch(actions.createComment());
    expect(store.getActions()).toMatchSnapshot();
  });
});
