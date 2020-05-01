import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import FillerScreen from './screens/FillerScreen';
import Constants from 'expo-constants';

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <FillerScreen />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1
  },
});
