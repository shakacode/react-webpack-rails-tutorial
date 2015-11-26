import React from 'react';
import { Provider } from 'react-redux';

import createStore from '../stores/commentsStore';
import NonRouterCommentScreen from '../components/NonRouterCommentScreen';

const App = props => {
  const store = createStore(props);
  return (
      <Provider store={store}>
        <NonRouterCommentScreen />
      </Provider>
  );
};

// Export is needed for the hot reload server
export default App;
