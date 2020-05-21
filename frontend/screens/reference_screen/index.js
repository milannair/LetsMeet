import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import Schedule from '../../models/Schedule';
import ReferenceComponent from '../../components/reference_component/index';
import ScheduleComponent from '../../components/ScheduleComponent/index';
import Day from '../../enums/Day';
import moment from 'moment';

function ReferenceScreen() {
  const schedule = new Schedule();
  schedule.availability = [
    {
      start: moment().day(0).hour(19).minutes(0).toDate(),
      end: moment().day(0).hour(19).minutes(45).toDate()
    },
    {
      start: moment().day(0).hour(0).minutes(0).toDate(),
      end: moment().day(0).hour(0).minutes(15).toDate()
    },
    {
      start: moment().day(3).hour(3).minutes(0).toDate(),
      end: moment().day(3).hour(5).minutes(0).toDate()
    },

  ];

  const firstDay = Day.SUNDAY;
  const lastDay = Day.SATURDAY;
  const firstHour = 0;
  const lastHour = 23; 

  return (
    <View style={styles.container}>
      {/* <ReferenceComponent text='hello!' /> */}
      <ScheduleComponent 
        firstDay={firstDay}
        lastDay={lastDay}
        firstHour={firstHour}
        lastHour={lastHour}
        divideHours={true}
        schedule={schedule} 
        selectable={true} 
      />
    </View>
  );
}

export default ReferenceScreen;