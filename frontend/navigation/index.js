import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as Screen from './screen-names';
import LoginScreen from '../screens/LoginScreen/index';
import SignupScreen from '../screens/SignupScreen/index';
import TabNavigation from './tab_navigator/index';

const Stack = createStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        {/* <Stack.Screen name={Screen.LOGIN} component={LoginScreen} /> */}
        {/* <Stack.Screen name={Screen.SIGNUP} component={SignupScreen} /> */}
        <Stack.Screen name={Screen.TABS} component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;