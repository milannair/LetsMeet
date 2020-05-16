import React from 'react';
import styles from './styles';
import { View } from 'react-native';
import Times from './components/Times/index';
import Days from './components/Days/index';
import Day from './Day';
import TimeSlots from './components/TimeSlots/index';

function Schedule() {
  const startDay = Day.SUNDAY;
  const endDay = Day.SATURDAY;
  const startTime = 0;
  const endTime = 23; 

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.daysSpacer} />
        <Days startDay={startDay} endDay={endDay} />
      </View>
      <View style={styles.bottomContainer}>
        <Times startTime={startTime} endTime={endTime} />
        <TimeSlots startDay={startDay} endDay={endDay} startTime={startTime} endTime={endTime} />
      </View>
    </View>
  );
}

export default Schedule;