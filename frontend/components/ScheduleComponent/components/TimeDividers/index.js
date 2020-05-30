import React from 'react';
import { Divider } from 'react-native-paper';

function TimeDividers({ firstHour, lastHour }) {
  const createDividers = () => {
    let dividers = [];
    for (let i = 0; i <= (lastHour - firstHour + 1); i++) {
      dividers.push(
        <Divider
          style={{
            position: 'absolute',
            width: '100%',
            top: 100 / (lastHour - firstHour + 1) * i + '%'
          }}
          key={i}
        />
      )
    }
    return dividers;
  }

  return createDividers();
}

export default TimeDividers;