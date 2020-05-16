import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import TimeSlot from '../TimeSlot/index';
import DayTime from '../../../../models/DayTime';

function TimeSlots({ startDay, endDay, startTime, endTime, }) {
  const timeSlots = [
    new DayTime(0, 3, 6),
    new DayTime(1, 5, 9),
    new DayTime(6, 0, 5),
    new DayTime(4, 4, 0),
  ];
  let timeSlotsSeparated = [];
  timeSlots.forEach((timeSlot) => {
    timeSlotsSeparated[timeSlot.day] = [];
    timeSlotsSeparated[timeSlot.day].push(timeSlot);
  });

  const mapTimeSlotsToComponents = (timeSlots) => {
    console.log(timeSlots);
    if (timeSlots) {
      return timeSlots.map((timeSlot) => (
        <TimeSlot startTime={startTime} endTime={endTime} dayTime={timeSlot} />
      ));
    }
  }

  const createTimeSlotColumns = () => {
    let timeSlotColumns = [];
    for (let i = startDay; i <= endDay; i++) {
      timeSlotColumns.push(
        <View style={styles.timeSlotColumn} key={i}>
          <View style={styles.timeSlotSpacer} />
          <View style={styles.timeSlotContainer}>
            { mapTimeSlotsToComponents(timeSlotsSeparated[i]) }
          </View>
          <View style={styles.timeSlotSpacer} />
        </View>
      );
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