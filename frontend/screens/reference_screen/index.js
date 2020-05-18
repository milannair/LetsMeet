import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import Schedule from '../../models/Schedule';
import DayTime from '../../models/DayTime';
import ReferenceComponent from '../../components/reference_component/index';
import ScheduleComponent from '../../components/ScheduleComponent/index';
import Day from '../../enums/Day';

function ReferenceScreen() {
  const schedule = new Schedule();
  schedule.timeSlots = [
    new DayTime(0, 3, 6),
    new DayTime(1, 5, 9),
    new DayTime(4, 4, 0),
    new DayTime(6, 0, 5),
    new DayTime(2, 12, 0),
    new DayTime(2, 3, 7)
  ];

  const firstDay = Day.SUNDAY;
  const lastDay = Day.SATURDAY;
  const firstHour = 5;
  const lastHour = 17; 

  return (
    <View style={styles.container}>
      {/* <ReferenceComponent text='hello!' /> */}
      <ScheduleComponent 
        firstDay={firstDay}
        lastDay={lastDay}
        firstHour={firstHour}
        lastHour={lastHour}
        schedule={schedule} 
        selectable={true} 
      />
    </View>
  );
}

export default ReferenceScreen;