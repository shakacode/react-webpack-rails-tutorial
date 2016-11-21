// @flow
import React from 'react';
import { Provider } from 'react-redux';
import store from './setup/store';
import Comments from './bundles/comments/Comments';

type PropsType = {

}

const App = (props: PropsType) => (
  <Provider store={store}>
    <Comments />
  </Provider>
);

export default App;
