import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import TimeSlot from '../TimeSlot/index';

function TimeSlots({ startDay, endDay, startTime, endTime, timeSlots, selectable, selectedDay, onDayPress }) {
  let timeSlotsSeparated = [];
  timeSlots.forEach((timeSlot) => {
    timeSlotsSeparated[timeSlot.day] = [];
    timeSlotsSeparated[timeSlot.day].push(timeSlot);
  });

  const mapTimeSlotsToComponents = (timeSlots) => {
    if (timeSlots) {
      return timeSlots.map((timeSlot, i) => (
        <TimeSlot startTime={startTime} endTime={endTime} dayTime={timeSlot} key={i} />
      ));
    }
  }

  const handleDayPress = (selectedDay) => {
    onDayPress(selectedDay);
  }

  const createTimeSlotColumns = () => {
    let timeSlotColumns = [];
    for (let i = startDay; i <= endDay; i++) {
      const columnContainer = selectable ? (
          <View 
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: i === selectedDay ? 'rgba(0, 0, 0, 0.05)' : 'white',
              // elevation: i === 0 ? 2 : 0
            }}
          >
            <View style={styles.timeSlotSpacer} />
            <View style={styles.timeSlotContainer}>
              { mapTimeSlotsToComponents(timeSlotsSeparated[i]) }
            </View>
            <View style={styles.timeSlotSpacer} />
          </View>
        )
        :
        (
          <View 
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: i === selectedDay ? 'rgba(0, 0, 0, 0.05)' : 'white',
            }}
            key={i}
          >
            <View style={styles.timeSlotSpacer} />
            <View style={styles.timeSlotContainer}>
              { mapTimeSlotsToComponents(timeSlotsSeparated[i]) }
            </View>
            <View style={styles.timeSlotSpacer} />
          </View>
        );
      if (selectable) {
        timeSlotColumns.push(
          <TouchableWithoutFeedback onPress={() => handleDayPress(i)} key={i}>
            { columnContainer }
          </TouchableWithoutFeedback>
        );
      } else {
        timeSlotColumns.push(
          columnContainer
        );
      }
    }
    return timeSlotColumns;
  };

  return (
    <View style={styles.timeSlotsContainer}>
      { createTimeSlotColumns() }
    </View>
  );
}

export default TimeSlots;