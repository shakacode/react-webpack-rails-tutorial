import commentFormReducer, { actions, initialState } from 'ReactNativeTutorial/app/reducers/commentFormReducer';

describe('commentFormReducer', () => {
  describe('updateCommentForm', () => {
    it('updates comment form with payload', () => {
      const payload = { author: 'Alexey', text: 'Random text' };
      expect(
        commentFormReducer(initialState, actions.updateCommentForm(payload))
      ).toMatchSnapshot();
    });
  });

  describe('resetCommentForm', () => {
    it('clears all values incl. meta', () => {
      const state = initialState.mergeDeep({
        meta: {
          errors: {
            author: 'Empty name',
          },
        },
        author: '',
        text: 'Random text',
      });
      expect(commentFormReducer(state, actions.resetCommentForm())).toMatchSnapshot();
    });
  });
});
