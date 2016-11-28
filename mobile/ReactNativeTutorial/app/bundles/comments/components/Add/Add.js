// @flow
import React from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';

import type { AddPropsType } from '../../hocs/withAddProps';

import styles from './AddStyle';

type PropsType = AddPropsType;

const Add = (props: PropsType) => (
  <View>
    <FormLabel>Author name</FormLabel>
    <FormInput onChangeText={(text: string) => props.actions.updateForm({ author: text })} />
    <FormLabel>Comment</FormLabel>
    <FormInput onChangeText={(text: string) => props.actions.updateForm({ text })} />
    <Button
      raised
      buttonStyle={styles.button}
      icon={{ name: 'send' }}
      title="Send"
      onPress={props.actions.createComment}
    />
  </View>
);

export default Add;
