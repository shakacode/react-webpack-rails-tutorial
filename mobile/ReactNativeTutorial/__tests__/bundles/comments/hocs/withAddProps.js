import React from 'react';
import withAddProps from 'ReactNativeTutorial/app/bundles/comments/hocs/withAddProps';
import Mock from 'mock';
import renderer from 'react-test-renderer';
import {createStoreFromState, initialState} from 'redux-mock-store';

describe('withAddProps', () => {
  it('adds AddProps to a component', () => {
    const state = initialState.mergeDeep({
      commentForm: {
        author: 'Alexey',
        text: 'Random comment',
      },
    });
    const store = createStoreFromState(state);
    const Component = withAddProps(Mock);
    const tree = renderer.create(<Component store={store} />);
    expect(tree).toMatchSnapshot();
  });
});
