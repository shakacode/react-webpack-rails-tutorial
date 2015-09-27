import React from 'react';
import { Provider } from 'react-redux';

import createStore from '../stores/commentsStore';
import CommentScreen from '../components/CommentScreen';

const App = props => {
  const store = createStore(props);
  const reactComponent = (
    <Provider store={store}>
      {() => <CommentScreen />}
    </Provider>
  );
  return reactComponent;
};

// Export is needed for the hot reload server
export default App;
