import { fromJS } from 'immutable';
import commentsPropsSelector from 'ReactNativeTutorial/app/selectors/commentsPropsSelector';

describe('commentsPropsSelector', () => {
  it('maps commentsStore to props', () => {
    const state = fromJS({
      commentsStore: {
        2: { id: 2, author: 'Justin', text: 'Another random comment' },
        3: { id: 3, author: 'John', text: 'Yet another random comment' },
        1: { id: 1, author: 'Alexey', text: 'Just some random comment' },
        meta: { loading: false },
      },
    });
    expect(commentsPropsSelector(state)).toMatchSnapshot();
  });
});
