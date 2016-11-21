// @flow
import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import styles from './FooterStyle';

type PropsType = {

}

const Footer = (props: PropsType) => (
  <View style={styles.container}>
    <Icon
      raised
      name='add'
      color='#f50'
      onPress={() => Actions.CommentsAdd()}
    />
  </View>
);

export default Footer;
