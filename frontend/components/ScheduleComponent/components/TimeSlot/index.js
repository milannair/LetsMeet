import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'react-native-paper';
import moment from 'moment';

function TimeSlot({ firstHour, lastHour, start, end, onTimeSlotPress }) {
  const { colors } = useTheme();

  const startMoment = moment(start);
  const endMoment = moment(end);

  // TODO: how do users input 12 AM as end time? 
  const fifteenMinIntervals = endMoment.diff(startMoment, 'minutes') / 15;

  const fifteenMinPercentage = (100 / ((lastHour - firstHour + 1) * 4));

  const height = fifteenMinPercentage * fifteenMinIntervals
  const top = start.getHours() - firstHour >= 0 ? 
    fifteenMinPercentage * ((startMoment.diff(moment().day(startMoment.day()).hour(firstHour).minutes(0), 'minutes') + 1) / 15)
    :
    0;

  return (
    <TouchableWithoutFeedback onPress={() => onTimeSlotPress(startMoment.day(), start, end)}>
      <View 
        style={{ height: height + '%',
            width: '100%',
            position: 'absolute',
            top: top + '%',
            backgroundColor: colors.accent,
        }}                   
      />
    </TouchableWithoutFeedback>
  )
}

export default TimeSlot;