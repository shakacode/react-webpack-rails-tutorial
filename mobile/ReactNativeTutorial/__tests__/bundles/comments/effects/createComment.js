import { fromJS } from 'immutable';
import { createStoreFromState } from 'redux-mock-store';
import { mockCallEffects } from 'redux-thunk-effects';
import * as actions from 'ReactNativeTutorial/app/bundles/comments/effects';

describe('createComment', () => {
  it('creates a comment in the store and sends request to api', async() => {
    const data = {
      commentsStore: {},
      commentForm: { author: 'Alexey', text: 'Random comment' },
    };
    const store = createStoreFromState(fromJS(data));
    const response = {
      entities: {
        comments: {
          1: { id: 1, author: 'Alexey', text: 'Random comment' },
        },
      },
    };
    mockCallEffects(null, response);
    await store.dispatch(actions.createComment());
    expect(store.getActions()).toMatchSnapshot();
  });
});
