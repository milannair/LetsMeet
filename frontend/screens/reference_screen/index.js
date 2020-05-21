import React from 'react';
import { View, Button } from 'react-native';
import styles from './styles';
import ReferenceComponent from '../../components/reference_component/index';
import useSocket from '../../hooks/UseSocket/index';

function ReferenceScreen() {
  const { sendData } = useSocket('test', () => {
    console.log('callback 1');
  });

  return (
    <View style={styles.container}>
      <ReferenceComponent text='hello!' />
      <Button title='send data' onPress={() => sendData('reference screen')} />
    </View>
  );
}

export default ReferenceScreen;