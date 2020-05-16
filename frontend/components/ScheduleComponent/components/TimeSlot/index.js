import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

function TimeSlot({ startTime, endTime, dayTime, dateTime }) {
  const { colors } = useTheme();
  let hours = dayTime.end - dayTime.start;
  // if time slot ends at 12 AM
  if (dayTime.end === 0) {
    hours = 24 - dayTime.start;
  }
  const height = (100 / (endTime - startTime + 1)) * hours // TODO: make this accurate to 15 or 30 mins
  const top = (100 / (endTime - startTime + 1)) * dayTime.start; // TODO: make this accurate to 15 or 30 mins
  return (
    <View style={{ height: height + '%',
                   width: '100%',
                   position: 'absolute',
                   top: top + '%',
                   backgroundColor: colors.accent
                }}
    />
  )
}

export default TimeSlot;