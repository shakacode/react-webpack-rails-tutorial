// @flow
import React from 'react';
import { View } from 'react-native';
import _ from 'lodash/fp';
import List from './List/List';
import Footer from './Footer/Footer';
import Spinner from './Spinner/Spinner';
import withIndexProps from '../../hocs/withIndexProps';

import styles from './IndexStyle';

type PropsType = {

}

class Index extends React.Component {

  props: PropsType;

  constructor(props: PropsType) {
    super(props);
    _.bindAll(['renderList'], this);
  }

  componentDidMount() {
    this.props.actions.fetch();
  }

  renderList() {
    return this.props.meta.loading ?
      <Spinner /> :
      <List {...this.props} />
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderList()}
        <Footer />
      </View>
    )
  }
}

export default withIndexProps(Index);
