import React, { useState } from 'react';
import styles from './styles';
import { View } from 'react-native';
import Times from './components/Times/index';
import Days from './components/Days/index';
import TimeSlots from './components/TimeSlots/index';

function Schedule({ firstDay, lastDay, firstHour, lastHour, schedule, selectable }) {
  const [selectedDay, setSelectedDay] = useState(selectable ? 0 : -1);

  const handleDayPress = (selectedDay) => {
    setSelectedDay(selectedDay);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.daysSpacer} />
        <Days 
          firstDay={firstDay} 
          lastDay={lastDay} 
          selectable={selectable}
          selectedDay={selectedDay}
          onDayPress={handleDayPress} 
        />
      </View>
      <View 
        style={{
          flex: lastHour - firstHour,
          flexDirection: 'row',
        }}
      >
        <Times 
          firstHour={firstHour} 
          lastHour={lastHour} 
        />
        <TimeSlots 
          firstDay={firstDay} 
          lastDay={lastDay} 
          firstHour={firstHour} 
          lastHour={lastHour} 
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