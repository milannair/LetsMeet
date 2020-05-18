import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { Caption } from 'react-native-paper';

function Times({ firstHour, lastHour }) {
  const createTimeCaptions = () => {
    let timeCaptions = [];
    for (let i = firstHour; i <= lastHour; i++) {
      let hour = i % 12;
      if (i % 12 === 0) {
        hour = 12;
      }
      timeCaptions.push(
        <Caption style={styles.time} key={i}>
          {hour} {(i / 12 >= 1) ? 'PM' : 'AM'}
        </Caption>
      )
    }
    return timeCaptions;
  }
  
  return (
    <View style={styles.container}>
      {createTimeCaptions()}
    </View>
  );
}

export default Times;