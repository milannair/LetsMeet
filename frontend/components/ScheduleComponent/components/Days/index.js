import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import { Caption } from 'react-native-paper';
import Day from '../../Day';

function Days({ startDay, endDay, selectable, selectedDay, onDayPress }) {
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
      const dayContainer = selectable ? (
          <View 
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: i === selectedDay ? 'rgba(0, 0, 0, 0.05)' : 'white',
            }}
          >
            <Caption style={styles.day}>
              {day}
            </Caption>
          </View>
        )
        :
        (
          <View 
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: i === selectedDay ? 'rgba(0, 0, 0, 0.05)' : 'white',
            }}
            key={i}
          >
            <Caption style={styles.day}>
              {day}
            </Caption>
          </View>
        );
      if (selectable) {
        days.push(
          <TouchableWithoutFeedback onPress={() => onDayPress(i)} key={i}>
            {dayContainer}
          </TouchableWithoutFeedback>
        );
      } else {
        days.push(
          dayContainer
        )
      }
    }
    return days;
  }

  return (
    <View style={styles.container}>
      { createDays() }
    </View>
  );
}

export default Days;