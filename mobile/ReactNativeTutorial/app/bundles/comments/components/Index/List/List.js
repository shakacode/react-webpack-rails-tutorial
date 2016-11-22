// @flow
import React from 'react';
import { ListView } from 'react-native';
import Item from './Item/Item';
import _ from 'lodash/fp';

import styles from './ListStyle';

type PropsType = {
}

const List = (props: PropsType) => {
  const data = _.compose(
    _.reverse,
    _.sortBy(_.get('id')),
    _.values
  )(props.comments);
  const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    .cloneWithRows(data);
  return (
    <ListView
      enableEmptySections
      style={styles.container}
      dataSource={dataSource}
      renderRow={(item) => <Item {...item} />}
    >
    </ListView>
  );
};

export default List;
