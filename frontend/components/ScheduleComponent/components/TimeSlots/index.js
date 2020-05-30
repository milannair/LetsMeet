import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import TimeSlot from '../TimeSlot/index';

function TimeSlots({ firstDay, lastDay, firstHour, lastHour, availability, selectable, selectedDay, onDayPress }) {
  let timeSlotsSeparated = {};
  availability.forEach((timeSlot) => {
    const day = timeSlot.start.getDay();
    if (!timeSlotsSeparated[day]) {
      timeSlotsSeparated[day] = [];
    }
    timeSlotsSeparated[day].push(timeSlot);
  });

  const mapTimeSlotsToComponents = (timeSlots) => {
    if (timeSlots) {
      return timeSlots.map((timeSlot, i) => (
        <TimeSlot firstHour={firstHour} lastHour={lastHour} start={timeSlot.start} end={timeSlot.end} key={i} />
      ));
    }
  }

  const handleDayPress = (selectedDay) => {
    onDayPress(selectedDay);
  }

  const createTimeSlotColumns = () => {
    let timeSlotColumns = [];
    for (let i = firstDay; i <= lastDay; i++) {
      const columnContainer = selectable ? (
          <View 
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: i === selectedDay ? 'rgba(0, 0, 0, 0.09)' : 'rgba(0, 0, 0, 0)',
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