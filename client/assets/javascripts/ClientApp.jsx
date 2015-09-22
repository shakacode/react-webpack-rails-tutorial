import React from 'react';
import { Provider } from 'react-redux';

import CommentScreen from './components/CommentScreen';
import CommentStore from './stores/CommentStore';

const App = () => {
  const reactComponent = (
    <Provider store={CommentStore}>
      {() => <CommentScreen />}
    </Provider>
  );
  return reactComponent;
};

// Export is needed for the hot reload server
export default App;
