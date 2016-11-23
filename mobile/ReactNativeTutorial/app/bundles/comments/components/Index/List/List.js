// @flow
import React from 'react';
import { ListView, RefreshControl } from 'react-native';
import _ from 'lodash/fp';
import Item from './Item/Item';

import styles from './ListStyle';

type PropsType = {
}

const List = (props: PropsType) => {
  const data = _.compose(
    _.reverse,
    _.sortBy(_.get('id')),
    _.values
  )(props.comments);
  const dataSource = new ListView.DataSource({ rowHasChanged: (r1: any, r2: any) => r1 !== r2 })
    .cloneWithRows(data);
  return (
    <ListView
      enableEmptySections
      style={styles.container}
      dataSource={dataSource}
      renderRow={(item: any) => <Item {...item} />}
      refreshControl={
        <RefreshControl
          refreshing={props.meta.loading}
          onRefresh={props.actions.fetch}
          tintColor="#4641B5"
        />
      }
    />
  );
};

export default List;
