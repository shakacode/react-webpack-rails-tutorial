import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';

import CommentStore from './stores/CommentStore';
import routes from './routes/routes';

const App = () => {
  const reactComponent = (
    <Provider store={CommentStore}>
      { () => <Router history={history} children={routes} /> }
    </Provider>
  );
  return reactComponent;
};

window.App = App;

// Export is needed for the hot reload server
export default App;
