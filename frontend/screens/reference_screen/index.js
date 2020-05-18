import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import Schedule from '../../models/Schedule';
import DayTime from '../../models/DayTime';
import ReferenceComponent from '../../components/reference_component/index';
import ScheduleComponent from '../../components/ScheduleComponent/index';

function ReferenceScreen() {
  const schedule = new Schedule();
  schedule.timeSlots = [
    new DayTime(0, 3, 6),
    new DayTime(1, 5, 9),
    new DayTime(6, 0, 5),
    new DayTime(4, 4, 0),
  ];

  return (
    <View style={styles.container}>
      {/* <ReferenceComponent text='hello!' /> */}
      <ScheduleComponent schedule={schedule} selectable={true} />
    </View>
  );
}

export default ReferenceScreen;