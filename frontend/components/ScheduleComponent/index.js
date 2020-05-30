import React, { useState } from 'react';
import styles from './styles';
import { View } from 'react-native';
import { Divider } from 'react-native-paper';
import Times from './components/Times/index';
import Days from './components/Days/index';
import TimeSlots from './components/TimeSlots/index';
import TimeDividers from './components/TimeDividers/index';

function Schedule({ firstDay, lastDay, firstHour, lastHour, schedule, divideHours, onDayPress, onTimeSlotPress, isGroupSchedule }) {
  if (firstDay > lastDay) {
    throw 'firstDay must be less than or equal to lastDay';
  } else if (firstHour > lastHour) {
    throw 'firstHour must be less than or equal to lastHour';
  } else {
    // validate schedule
    if (!schedule) {
      throw 'Schedule is undefined';
    } else {
      // schedule.availability.forEach((timeSlot) => {
      //   if (timeSlot.end != 0 && timeSlot.start > timeSlot.end) {
      //     throw 'The following DayTime in Schedule.timeSlots is invalid: ' + JSON.stringify(timeSlot);
      //   }
      // });
    }
  }



  const [selectedDay, setSelectedDay] = useState(onDayPress ? firstDay : -1);

  const handleDayPress = (selectedDay) => {
    setSelectedDay(selectedDay);
    onDayPress(selectedDay);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.daysSpacer} />
        <Days 
          firstDay={firstDay} 
          lastDay={lastDay}
          selectedDay={selectedDay}
          onDayPress={handleDayPress} 
        />
      </View>
      <View 
        style={{
          flex: 23,
          flexDirection: 'row',
        }}
      >
        { divideHours && <TimeDividers firstHour={firstHour} lastHour={lastHour} /> }
        <Times 
          firstHour={firstHour} 
          lastHour={lastHour} 
        />
        <TimeSlots 
          firstDay={firstDay} 
          lastDay={lastDay} 
          firstHour={firstHour} 
          lastHour={lastHour} 
          schedule={schedule} // TODO: add functionality for meetings/events (DateTime's)
          selectedDay={selectedDay}
          onDayPress={onDayPress ? handleDayPress : null} 
          onTimeSlotPress={onTimeSlotPress}
          isGroupSchedule={isGroupSchedule}
        />
      </View>
    </View>
  );
}

export default Schedule;