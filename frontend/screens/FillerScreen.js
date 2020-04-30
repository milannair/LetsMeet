import React from 'react';
import FillerComponent from '../components/FillerComponent';

function FillerScreen() {
  return (
    <View>
      <FillerComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontSize: 24
  }
});

export default Filler;