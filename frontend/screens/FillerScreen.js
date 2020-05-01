import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FillerComponent from '../components/FillerComponent';

function FillerScreen() {
  return (
    <View style={styles.container}>
      <FillerComponent text='hello!' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

export default FillerScreen;