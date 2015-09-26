import React from 'react';
import { Provider } from 'react-redux';

import commentsStore from '../stores/commentsStore';
import CommentScreen from '../components/CommentScreen';

const App = () => {
  const reactComponent = (
    <Provider store={commentsStore}>
      {() => <CommentScreen />}
    </Provider>
  );
  return reactComponent;
};

// Export is needed for the hot reload server
export default App;
