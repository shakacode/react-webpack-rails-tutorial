/* eslint-disable no-console */
import React from 'react';
import { Scene, Router, Reducer } from 'react-native-router-flux';
import Add from '../../bundles/comments/containers/Add';
import Index from '../../bundles/comments/containers/Index';

import styles from './RouterStyle';

const reducerCreate = params => (state, action) => {
  console.log('Executing navigation action', action);
  return Reducer(params)(state, action);
};

export default () => (
  <Router createReducer={reducerCreate} sceneStyle={styles.container}>
    <Scene key="root">
      <Scene key="commentsIndex" component={Index} title="Comments" initial />
      <Scene key="commentsAdd" component={Add} title="Add comment" />
    </Scene>
  </Router>
);
