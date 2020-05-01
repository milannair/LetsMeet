import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FillerComponent from '../components/FillerComponent';

function FillerScreen() {
  return (
    <View>
      <FillerComponent text='hello!' />
    </View>
  );
}

const styles = StyleSheet.create({

});

export default FillerScreen;