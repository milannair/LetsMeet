import React, { useEffect, useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import TimeSlot from '../TimeSlot/index';
import moment from 'moment';
import { useTheme } from 'react-native-paper';

function TimeSlots({ firstDay, lastDay, firstHour, lastHour, schedule, selectedDay, onDayPress, onTimeSlotPress, isGroupSchedule }) {
  const { colors } = useTheme();
  const [timeSlotsSeparated, setTimeSlotsSeparated] = useState({});
  const [maxCount, setMaxCount] = useState(1);

  useEffect(() => {
    // split up time slots in each day
    const newTimeSlotsSeparated = {};
    schedule.forEach((timeSlot, i) => {
      const day = timeSlot.startTime.getDay();
      if (!newTimeSlotsSeparated[day]) {
        newTimeSlotsSeparated[day] = [];
      }
      newTimeSlotsSeparated[day].push(timeSlot);
    });

    // if isGroupSchedule is true, merge time common time slots with counts of how many users are available in each time slot
    let newMaxCount = 1;
    if (isGroupSchedule) {
      Object.keys(newTimeSlotsSeparated).forEach((day) => {
        const { mergedTimeSlots, maxCount } = mergeTimeSlots(newTimeSlotsSeparated[day]);
        newTimeSlotsSeparated[day] = mergedTimeSlots;
        newMaxCount = maxCount > newMaxCount ? maxCount : newMaxCount;
      });
    }
    setTimeSlotsSeparated(newTimeSlotsSeparated);
    setMaxCount(newMaxCount);
  }, [schedule])

  // this is only for an array of timeslots on the SAME DAY
  const mergeTimeSlots = (timeSlots) => {
    let timeSlotToCount = {};
    let maxCount = 1;
    if (timeSlots) {
      timeSlots.forEach((timeSlot) => {
        const startMoment = moment(timeSlot.startTime);
        const endMoment = moment(timeSlot.endTime);
        while (!startMoment.isSame(endMoment)) {
          const timeRange = JSON.stringify({ startTime: startMoment.toDate(), endTime: startMoment.add(15, 'minutes').toDate()});
          if (!timeSlotToCount[timeRange]) {
            timeSlotToCount[timeRange] = 1;
          } else {
            timeSlotToCount[timeRange] += 1;
            if (timeSlotToCount[timeRange] > maxCount) {
              maxCount = timeSlotToCount[timeRange];
            }
          }
        }
      });
    }
    let result = [];
    let prevCount = 0;
    let prevStart = null;
    let prevEnd = null;
    Object.keys(timeSlotToCount).sort().forEach((timeSlot) => {
      const currCount = timeSlotToCount[timeSlot];
      const currTimeSlot = JSON.parse(timeSlot);
      if (currCount !== prevCount || prevEnd !== currTimeSlot.startTime) {
        if (prevStart && prevEnd) {
          result.push({
            startTime: new Date(prevStart),
            endTime: new Date(prevEnd),
            count: prevCount
          });
        }

        prevCount = currCount;
        prevStart = currTimeSlot.startTime;
        prevEnd = currTimeSlot.endTime;
      } else {
        prevEnd = currTimeSlot.endTime;
      }
    });
    if (prevStart && prevEnd) {
      result.push({
        startTime: new Date(prevStart),
        endTime: new Date(prevEnd),
        count: prevCount,
      });
    }
    return { mergedTimeSlots: result, maxCount: maxCount };
  };

  const mapTimeSlotsToComponents = (timeSlots, i) => {
    if (timeSlots) {
      const result = [];
      timeSlots.forEach((timeSlot, i) => {
        if (isGroupSchedule) { // could also check for divideHours = true b/c we don't need to have white background if there are no hour lines
          result.push(
            <TimeSlot 
              firstHour={firstHour} 
              lastHour={lastHour} 
              start={timeSlot.startTime} 
              end={timeSlot.endTime} 
              onTimeSlotPress={onTimeSlotPress} 
              color={'white'}
              key={2 * i} 
            />
          )
          result.push(
            <TimeSlot 
              firstHour={firstHour} 
              lastHour={lastHour} 
              start={timeSlot.startTime} 
              end={timeSlot.endTime} 
              onTimeSlotPress={onTimeSlotPress} 
              color={'rgba(105,229,174,' + (1 / maxCount * timeSlot.count) + ')'}
              countAvailable={timeSlot.count}
              key={2 * i + 1} 
            />
          );
        } else {
          result.push(
            <TimeSlot 
              firstHour={firstHour} 
              lastHour={lastHour} 
              start={timeSlot.startTime} 
              end={timeSlot.endTime} 
              onTimeSlotPress={onTimeSlotPress} 
              color={colors.accent}
              key={i} 
            />
          )
        }
      });
      return result;
    }
  }

  const handleDayPress = (selectedDay) => {
    onDayPress(selectedDay);
  }

  const createTimeSlotColumns = () => {
    let timeSlotColumns = [];
    for (let i = firstDay; i <= lastDay; i++) {
      const columnContainer = onDayPress ? (
          <View 
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: i === selectedDay ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0)',
              // elevation: i === 0 ? 2 : 0
            }}
          >
            <View style={styles.timeSlotSpacer} />
            <View style={styles.timeSlotContainer}>
              { mapTimeSlotsToComponents(timeSlotsSeparated[i], i) }
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
              backgroundColor: 'rgba(0, 0, 0, 0)',
            }}
            key={i}
          >
            <View style={styles.timeSlotSpacer} />
            <View style={styles.timeSlotContainer}>
              { mapTimeSlotsToComponents(timeSlotsSeparated[i], i) }
            </View>
            <View style={styles.timeSlotSpacer} />
          </View>
        );
      if (onDayPress) {
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