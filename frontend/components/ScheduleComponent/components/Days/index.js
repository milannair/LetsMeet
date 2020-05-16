import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { Caption } from 'react-native-paper';
import Day from '../../Day';

function Days({ startDay, endDay }) {
  const createDays = () => {
    let days = []
    for (let i = startDay; i <= endDay; i++) {
      let day = '';
      switch (i) {
        case (Day.SUNDAY):
        case (Day.SATURDAY):
          day = 'S';
          break;
        case (Day.MONDAY):
          day = 'M';
          break;
        case (Day.TUESDAY):
          day = 'T';
          break;
        case (Day.WEDNESDAY):
          day = 'W';
          break;
        case (Day.THURSDAY):
          day = 'Th';
          break;
        case (Day.FRIDAY):
          day = 'F';
          break;
      }
      days.push(
        <View style={styles.dayContainer} key={i}>
          <Caption style={styles.day}>{day}</Caption>
        </View>
      );
    }
    return days;
  }

  return (
    <View style={styles.container}>
      {createDays()}
    </View>
  );
}

export default Days;