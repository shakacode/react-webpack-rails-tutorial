import { fromJS } from 'immutable';
import commentsStoreSelector from 'ReactNativeTutorial/app/selectors/commentsStoreSelector';

describe('commentsStoreSelector', () => {
  it('selects the comments store', () => {
    const state = fromJS({
      commentsStore: {
        1: { id: 1, author: 'Alexey', text: 'Random comment' },
        2: { id: 2, author: 'Justin', text: 'Another random comment' },
      },
    });
    expect(commentsStoreSelector(state)).toMatchSnapshot();
  });
});
