// @flow
import React from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'

import withAddProps from '../../hocs/withAddProps'

import styles from './AddStyle';

type PropsType = {

}

const Add = (props: PropsType) => (
  <View style={styles.container}>
    <FormLabel>Author name</FormLabel>
    <FormInput onChangeText={(text) => {props.actions.updateForm({name: text})}}/>
    <FormLabel>Comment</FormLabel>
    <FormInput onChangeText={(text) => {props.actions.updateForm({comment: text})}}/>
  </View>
);

export default withAddProps(Add);
