// @flow
import React from 'react';
import { ListView } from 'react-native';

import styles from './ListStyle';

type PropsType = {

}

const List = (props: PropsType) => (
  <ListView
    style={styles.container}
    dataSource={new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })}
    renderRow={() => null}
  >
  </ListView>
);

export default List;

