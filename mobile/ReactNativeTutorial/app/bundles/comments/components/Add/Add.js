// @flow
import React from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'

import withAddProps from '../../hocs/withAddProps'

import styles from './AddStyle';

type PropsType = {

}

const Add = (props: PropsType) => (
  <View style={styles.container}>
    <FormLabel>Author name</FormLabel>
    <FormInput onChangeText={(text) => {props.actions.updateForm({author: text})}}/>
    <FormLabel>Comment</FormLabel>
    <FormInput onChangeText={(text) => {props.actions.updateForm({ text })}}/>
    <Button
      raised
      buttonStyle={styles.button}
      icon={{name: 'send'}}
      title='Send'
      onPress={props.actions.createComment}
    />
  </View>
);

export default withAddProps(Add);
