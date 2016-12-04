import { fromJS } from 'immutable';
import commentsStoreReducer, { actions, initialState } from 'ReactNativeTutorial/app/reducers/commentsStoreReducer';

const sampleData = {
  1: { id: 1, author: 'Alexey', text: 'Random comment' },
  2: { id: 2, author: 'Justin', text: 'Another random comment' },
};

describe('commentsStoreReducer', () => {
  describe('createComments', () => {
    it('adds comments to the store', () => {
      expect(
        commentsStoreReducer(
          initialState,
          actions.createComments(sampleData))
      ).toMatchSnapshot();
    });
  });

  describe('removeComment', () => {
    it('removes comment by id', () => {
      expect(
        commentsStoreReducer(initialState.merge(sampleData), actions.removeComment('1'))
      ).toMatchSnapshot();
    });
  });

  describe('setLoadingComments', () => {
    it('sets the loading meta information', () => {
      const trueState = commentsStoreReducer(initialState, actions.setLoadingComments(true));
      const falseState = commentsStoreReducer(trueState, actions.setLoadingComments(false));
      expect(trueState).toMatchSnapshot();
      expect(falseState).toMatchSnapshot();
    });
  });
});

