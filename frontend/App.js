import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import ReferenceScreen from './screens/reference_screen/index';
import SignupScreen from './screens/SignupScreen/index';
import { Provider as PaperProvider } from 'react-native-paper';
import FillerScreen from './screens/FillerScreen';
import GroupsPage from './screens/GroupsPage'
import Constants from 'expo-constants';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#b57edc',
    accent: '#aaf0d1',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        {/* <FillerScreen /> */}
        <GroupsPage/>
        <SignupScreen />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
});
