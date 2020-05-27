import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import ReferenceComponent from '../../components/reference_component/index';
import ScheduleComponent from '../../components/ScheduleComponent/index';
import Day from '../../enums/Day';
import Schedule from '../../models/Schedule';
import moment from 'moment';

function ReferenceScreen() {
  const schedule = new Schedule();
  schedule.availability = [
    {
      start: moment().day(0).hour(0).minutes(0).toDate(),
      end: moment().day(0).hour(24).minutes(0).toDate()
    },
    {
      start: moment().day(1).hour(9).minutes(0).toDate(),
      end: moment().day(1).hour(11).minutes(30).toDate()
    },
    {
      start: moment().day(1).hour(13).minutes(30).toDate(),
      end: moment().day(1).hour(17).minutes(0).toDate()
    },
    {
      start: moment().day(2).hour(9).minutes(0).toDate(),
      end: moment().day(2).hour(10).minutes(0).toDate()
    },
    {
      start: moment().day(2).hour(11).minutes(30).toDate(),
      end: moment().day(2).hour(13).minutes(30).toDate()
    },
    {
      start: moment().day(2).hour(13).minutes(30).toDate(),
      end: moment().day(2).hour(18).minutes(0).toDate()
    },
    {
      start: moment().day(1).hour(13).minutes(30).toDate(),
      end: moment().day(1).hour(17).minutes(0).toDate()
    },
    {
      start: moment().day(3).hour(9).minutes(0).toDate(),
      end: moment().day(3).hour(11).minutes(30).toDate()
    },
    {
      start: moment().day(3).hour(13).minutes(30).toDate(),
      end: moment().day(3).hour(17).minutes(0).toDate()
    },
    {
      start: moment().day(4).hour(9).minutes(0).toDate(),
      end: moment().day(4).hour(10).minutes(0).toDate()
    },
    {
      start: moment().day(4).hour(11).minutes(30).toDate(),
      end: moment().day(4).hour(13).minutes(30).toDate()
    },
    {
      start: moment().day(4).hour(13).minutes(30).toDate(),
      end: moment().day(4).hour(18).minutes(0).toDate()
    },

  ];
  const firstDay = Day.SUNDAY;
  const lastDay = Day.SATURDAY;
  const firstHour = 8;
  const lastHour = 22; 

  return (
    <View style={styles.container}>
      {/* <ReferenceComponent text='hello' /> */}
      <ScheduleComponent
        firstDay={firstDay}
        lastDay={lastDay}
        firstHour={firstHour}
        lastHour={lastHour}
        divideHours={true}
        schedule={schedule}
        selectable={false}
      />
    </View>
  );
}

export default ReferenceScreen;