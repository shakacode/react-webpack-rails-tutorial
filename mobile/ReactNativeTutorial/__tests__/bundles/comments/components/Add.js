import React from 'react';
import Add from 'ReactNativeTutorial/app/bundles/comments/components/Add/Add';

import renderer from 'react-test-renderer';

const actions = {
  fetch: jest.fn(),
  updateForm: jest.fn(),
  createComment: jest.fn(),
};

describe('Add', () => {
  it('renders correctly', () => {
    const props = {
      author: 'Alexey',
      text: 'Some random comment',
      actions,
    };
    const tree = renderer.create(
      <Add {...props} />
    );
    expect(tree).toMatchSnapshot();
  });
});
