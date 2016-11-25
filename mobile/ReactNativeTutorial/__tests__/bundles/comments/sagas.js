import store from 'redux-mock-store';

import { actions } from 'ReactNativeTutorial/app/bundles/comments/sagas';

describe('fetch', () => {
  it('fetches comments from remote api', () => {
    const response = {
      comments: [
        { id: 1, author: 'Alexey', text: 'Just some random comment' },
        { id: 2, author: 'Justin', text: 'Another random comment' },
      ],
    };
    fetch.mockResponseSuccess(response);
  });
});
