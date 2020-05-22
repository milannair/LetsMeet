import React from 'react';
import { View, Button } from 'react-native';
import styles from './styles';
import Schedule from '../../models/Schedule';
import ReferenceComponent from '../../components/reference_component/index';
import useSocket from '../../hooks/UseSocket/index';

function ReferenceScreen() {
  const { sendData } = useSocket('change', () => {
    console.log('user changed');
  });

  return (
    <View style={styles.container}>
      <ReferenceComponent text='hello!' />
      <Button title='send data' onPress={() => sendData('5ec309cdeb54b1ff07806432')} />
    </View>
  );
}

export default ReferenceScreen;