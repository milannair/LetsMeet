import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DarkTheme, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import ReferenceScreen from './screens/reference_screen/index';
// import SignupScreen from './screens/SignupScreen/index';
import Constants from 'expo-constants';
import Login from './screens/LoginScreen/index';

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
        <Login />
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
