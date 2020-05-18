import React, { useState } from 'react';
import styles from './styles';
import { View } from 'react-native';
import Times from './components/Times/index';
import Days from './components/Days/index';
import Day from './Day';
import TimeSlots from './components/TimeSlots/index';

function Schedule({ schedule, selectable }) {
  const [selectedDay, setSelectedDay] = useState(selectable ? 0 : -1);

  const startDay = Day.SUNDAY;
  const endDay = Day.SATURDAY;
  const startTime = 0;
  const endTime = 23; 

  const handleDayPress = (selectedDay) => {
    setSelectedDay(selectedDay);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.daysSpacer} />
        <Days 
          startDay={startDay} 
          endDay={endDay} 
          selectable={selectable}
          selectedDay={selectedDay}
          onDayPress={handleDayPress} 
        />
      </View>
      <View style={styles.bottomContainer}>
        <Times 
          startTime={startTime} 
          endTime={endTime} 
        />
        <TimeSlots 
          startDay={startDay} 
          endDay={endDay} 
          startTime={startTime} 
          endTime={endTime} 
          timeSlots={schedule.timeSlots} // TODO: add functionality for meetings/events (DateTime's)
          selectable={selectable}
          selectedDay={selectedDay}
          onDayPress={handleDayPress} 
        />
      </View>
    </View>
  );
}

export default Schedule;