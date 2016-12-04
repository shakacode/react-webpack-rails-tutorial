import React from 'react';
import withIndexProps from 'ReactNativeTutorial/app/bundles/comments/hocs/withIndexProps';
import Mock from 'mock';
import renderer from 'react-test-renderer';
import { createStoreFromState, initialState } from 'redux-mock-store';

describe('withIndexProps', () => {
  it('adds props to Index component', () => {
    const state = initialState.mergeDeep({
      commentsStore: {
        2: { id: 2, author: 'Justin', text: 'Another random comment' },
        3: { id: 3, author: 'John', text: 'Yet another random comment' },
        1: { id: 1, author: 'Alexey', text: 'Just some random comment' },
      },
    });
    const store = createStoreFromState(state);
    const Component = withIndexProps(Mock);
    const tree = renderer.create(<Component store={store} />);
    expect(tree).toMatchSnapshot();
  });
});
