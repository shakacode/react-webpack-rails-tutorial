// @flow
import React from 'react';
import { ListView } from 'react-native';
import Item from './Item/Item';

import styles from './ListStyle';

type PropsType = {

}

class List extends React.Component {

  props: PropsType;

  state: {
    dataSource: ListView.DataSource;
  };


  constructor(props: PropsType) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(nextProps.comments) })
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(item) => <Item {...item} />}
      >
      </ListView>
    )
  }
}

export default List;
