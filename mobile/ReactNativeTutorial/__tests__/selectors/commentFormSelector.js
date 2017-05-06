import { fromJS } from 'immutable';
import commentFormSelector from 'ReactNativeTutorial/app/selectors/commentFormSelector';

describe('commentFormSelector', () => {
  it('selects the comment form store', () => {
    const state = fromJS({
      commentForm: {
        author: 'Alexey',
        text: 'Random comment',
      },
    });
    expect(commentFormSelector(state)).toMatchSnapshot();
  });
});
