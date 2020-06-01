import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import ReferenceComponent from '../../components/reference_component/index';

function ReferenceScreen() {

  return (
    <View style={styles.container}>
      <ReferenceComponent text='hello' />
    </View>
  );
}

export default ReferenceScreen;