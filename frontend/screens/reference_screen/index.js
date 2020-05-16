import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import ReferenceComponent from '../../components/reference_component/index';
import ScheduleComponent from '../../components/ScheduleComponent/index';

function ReferenceScreen() {
  return (
    <View style={styles.container}>
      {/* <ReferenceComponent text='hello!' /> */}
      <ScheduleComponent />
    </View>
  );
}

export default ReferenceScreen;