import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
<<<<<<< HEAD
import FillerScreen from './screens/FillerScreen';
import SignupScreen from './screens/SignupScreen/index';
=======
import ReferenceScreen from './screens/reference_screen/index';
>>>>>>> origin/frontend_signup_controller
import Constants from 'expo-constants';

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
<<<<<<< HEAD
        {/* <FillerScreen /> */}
        <SignupScreen />
=======
        <ReferenceScreen />
>>>>>>> origin/frontend_signup_controller
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
