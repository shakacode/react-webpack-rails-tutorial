// @flow
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import styles from './SpinnerStyle';

type PropsType = {

}

const Spinner = (props: PropsType) => (
  <View style={styles.container}>
    <ActivityIndicator
      size="large"
      color="#4641B5"
    />
  </View>
);

export default Spinner;

