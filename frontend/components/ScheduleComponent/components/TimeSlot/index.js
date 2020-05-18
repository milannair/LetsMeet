import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'react-native-paper';

function TimeSlot({ firstHour, lastHour, dayTime, dateTime }) {
  const { colors } = useTheme();
  let hoursOnSchedule = dayTime.end - dayTime.start;
  // if the DayTime ends at 12 AM
  if (dayTime.end === 0) {
    hoursOnSchedule = lastHour - dayTime.start;
  }
  // if the DayTime is off the schedule hours
  else if ((dayTime.start < firstHour && dayTime.end < firstHour) || (dayTime.start > lastHour && dayTime.end > lastHour)) {
    hoursOnSchedule = 0;
  // if DayTime start is before schedule hours, but DayTime end is within schedule hours
  } else if (dayTime.start < firstHour && dayTime.end >= firstHour) {
    hoursOnSchedule = (dayTime.end - firstHour);
  // if DayTime start is within schedule hours, but DayTime end is after schedule hours
  } else if (dayTime.start >= firstHour && dayTime.end > lastHour) {
    hoursOnSchedule = (lastHour - dayTime.start);
  }
  // if time slot ends at 12 AM
  if (dayTime.end === 0) {
    hoursOnSchedule = 24 - dayTime.start;
  }
  const height = (100 / (lastHour - firstHour + 1)) * hoursOnSchedule // TODO: make this accurate to 15 or 30 mins
  const top = dayTime.start - firstHour >= 0 ? 
    (100 / (lastHour - firstHour + 1)) * (dayTime.start - firstHour)
    :
    0 // TODO: make this accurate to 15 or 30 mins

  const handlePress = () => {
    // TODO: implement functionality when user touches a timeslot (ie: allow user to remove)
    // TODO: only use onPress when parent has props.selectable = true
  };

  return (
    <TouchableWithoutFeedback>
      <View 
        style={{ height: height + '%',
            width: '100%',
            position: 'absolute',
            top: top + '%',
            backgroundColor: colors.accent
        }}
        onPress={() => handlePress()}                      
      />
    </TouchableWithoutFeedback>
  )
}

export default TimeSlot;