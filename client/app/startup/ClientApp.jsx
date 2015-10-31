import React from 'react';
import { Provider } from 'react-redux';

import createStore from '../stores/commentsStore';
import CommentScreen from '../components/CommentScreen';

const App = props => {
  const store = createStore(props);
  return (
      <Provider store={store}>
        <CommentScreen />
      </Provider>
  );
};

// Export is needed for the hot reload server
export default App;
