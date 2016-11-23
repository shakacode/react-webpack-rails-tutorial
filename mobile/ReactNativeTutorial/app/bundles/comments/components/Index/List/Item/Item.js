// @flow
import React from 'react';
import { View, Text } from 'react-native';

import styles from './ItemStyle';

type PropsType = {
  author: string,
  text: string,
}

const Item = (props: PropsType) => (
  <View style={styles.container}>
    <Text style={styles.header}>{props.author}</Text>
    <Text style={styles.body}>{props.text}</Text>
  </View>
);

export default Item;

