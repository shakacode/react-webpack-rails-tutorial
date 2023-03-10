import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import NonRouterCommentsContainer from '../containers/NonRouterCommentsContainer.jsx';

function App(_props, _railsContext) {
  const store = ReactOnRails.getStore('commentsStore');

  return function AppComponent() {
    return (
      <Provider store={store}>
        <NonRouterCommentsContainer />
      </Provider>
    );
  };
}

export default App;
