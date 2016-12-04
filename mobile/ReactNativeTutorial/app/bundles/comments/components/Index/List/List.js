// @flow
import React from 'react';
import { ListView, RefreshControl } from 'react-native';
import type { IndexPropsType } from '../../../containers/Index';
import Item from './Item/Item';

type PropsType = IndexPropsType;

const List = (props: PropsType) => {
  const dataSource = new ListView.DataSource({ rowHasChanged: (r1: any, r2: any) => r1 !== r2 })
    .cloneWithRows(props.comments || []);
  return (
    <ListView
      enableEmptySections
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
