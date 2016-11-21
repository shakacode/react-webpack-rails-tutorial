import React from 'react';
import Add from '../bundles/comments/components/Add/Add';
import Index from '../bundles/comments/components/Index/Index';
import { Scene, Router, Reducer } from 'react-native-router-flux'

const reducerCreate = params => {
  const defaultReducer = Reducer(params);
  return (state, action)=>{
    console.log(`Executing navigation action`, action);
    return defaultReducer(state, action);
  }
};

export default () => (
  <Router createReducer={reducerCreate} sceneStyle={{backgroundColor:'#F7F7F7', paddingTop: 66}}>
    <Scene key="root">
      <Scene key="CommentsIndex" component={Index} title="Comments"  initial={true} />
      <Scene key="CommentsAdd" component={Add} title="Add comment" />
    </Scene>
  </Router>
)
