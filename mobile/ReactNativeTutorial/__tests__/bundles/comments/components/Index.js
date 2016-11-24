import React from 'react';
import store from 'ReactNativeTutorial/app/setup/store';
import Index from 'ReactNativeTutorial/app/bundles/comments/components/Index/Index';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const response = {
    comments: [
      { id: 1, author: 'Alexey', text: 'Just some random comment' },
      { id: 2, author: 'Justin', text: 'Another random comment' },
    ],
  };
  fetch.mockResponseSuccess(response);
  const tree = renderer.create(
    <Index store={store} />
  );
  expect(tree).toMatchSnapshot();
});
