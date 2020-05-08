import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import ReferenceScreen from './screens/reference_screen/index';
import Constants from 'expo-constants';
import TabNavigator from './navigation/index';

export default function App() {
  return (
    <PaperProvider>
      <TabNavigator />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1
  },
});
