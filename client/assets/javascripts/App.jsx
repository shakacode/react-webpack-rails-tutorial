import React from 'react';
import { Provider } from 'react-redux';

import CommentScreen from './components/CommentScreen';
import CommentStore from './stores/CommentStore';

window.App = () => {
  const reactComponent = (
    <Provider store={CommentStore}>
      {() => <CommentScreen />}
    </Provider>
  );
  return reactComponent;
};
