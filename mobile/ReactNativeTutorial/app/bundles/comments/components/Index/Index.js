// @flow
import React from 'react';
import { View } from 'react-native';
import List from './List/List';
import Footer from './Footer/Footer';

import styles from './IndexStyle';

type PropsType = {

}

const Index = (props: PropsType) => (
  <View style={styles.container}>
    <List {...props} />
    <Footer />
  </View>
);

export default Index;
