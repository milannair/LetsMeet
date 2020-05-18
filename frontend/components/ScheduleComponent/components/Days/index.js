import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { Caption } from 'react-native-paper';
import Day from '../../Day';
import { useTheme } from 'react-native-paper';

function Days({ startDay, endDay, onDayPress, selectable }) {
  const [selectedDay, setSelectedDay] = useState(0);

  const { colors } = useTheme();

  const handleDayPress = (selectedDay) => {
    setSelectedDay(selectedDay);
    if (onDayPress) {
      onDayPress(selectedDay);
    }
  };

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
      const caption = selectable ? (
        <Caption 
          style={styles.day} 
          onPress={() => handleDayPress(i)}
        >
          {day}
        </Caption>
      ) : (
        <Caption 
          style={styles.day} 
        >
          {day}
        </Caption>
      );
      days.push(
        <View 
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: (selectedDay === i && selectable) ? '#e8aeff' : '#ffffff',
          }} 
          key={i}
        >
          { caption }
        </View>
      );
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