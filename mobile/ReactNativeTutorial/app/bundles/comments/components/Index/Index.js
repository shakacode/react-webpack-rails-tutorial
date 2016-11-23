// @flow
import React from 'react';
import { View } from 'react-native';
import List from './List/List';
import Footer from './Footer/Footer';
import withIndexProps from '../../hocs/withIndexProps';

import styles from './IndexStyle';

type PropsType = {

}

class Index extends React.Component {

  props: PropsType;

  componentDidMount() {
    this.props.actions.fetch();
  }

  render() {
    return (
      <View style={styles.container}>
        <List {...this.props} />
        <Footer />
      </View>
    );
  }
}

export default withIndexProps(Index);
