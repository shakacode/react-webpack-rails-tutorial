import React from 'react';
import Index from 'ReactNativeTutorial/app/bundles/comments/components/Index/Index';

import renderer from 'react-test-renderer';

const actions = {
    fetch: jest.fn(),
    updateForm: jest.fn(),
    createComment: jest.fn(),
};

describe('Index', () => {
  it('renders correctly when loaded', () => {
    const props = {
      comments: [
        { id: 1, author: 'Alexey', text: 'Just some random comment' },
        { id: 2, author: 'Justin', text: 'Another random comment' },
      ],
      meta: {
        loading: false,
      },
      actions,
    };
    const tree = renderer.create(
      <Index {...props} />
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when loading', () => {
    const props = {
      meta: {
        loading: true,
      },
      actions,
    };
    const tree = renderer.create(
      <Index {...props} />
    );
    expect(tree).toMatchSnapshot();
  });
});

