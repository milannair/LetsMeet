import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import SignupScreen from './screens/SignupScreen/index';
import CreateGroupScreen from './screens/CreateGroupScreen/index'
import GroupsScreen from './screens/GroupsScreen/index'
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
        <CreateGroupScreen/>
        {/* <GroupsScreen/> */}
        {/* <SignupScreen /> */}
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
