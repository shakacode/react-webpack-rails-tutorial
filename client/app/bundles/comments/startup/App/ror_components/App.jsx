import { Provider } from 'react-redux';
import React from 'react';
import ReactOnRails from 'react-on-rails';

import NonRouterCommentsContainer from '../../../containers/NonRouterCommentsContainer.jsx';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/de';
import 'intl/locale-data/jsonp/ja';
import 'intl/locale-data/jsonp/zh';

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
