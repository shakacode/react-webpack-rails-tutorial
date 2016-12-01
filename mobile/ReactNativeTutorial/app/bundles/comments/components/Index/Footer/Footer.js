// @flow
import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import styles from './FooterStyle';

const Footer = () => (
  <View style={styles.container}>
    <Icon
      raised
      reverse
      name="add"
      color="#f50"
      onPress={Actions.commentsAdd}
    />
  </View>
);

export default Footer;
