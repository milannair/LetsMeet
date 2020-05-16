import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as Screen from './screen-names';
// import SignupScreen from '../screens/SignupScreen/index';
import GroupScreen from '../screens/GroupsScreen/index';
import CreateGroupScreen from '../screens/CreateGroupScreen/index'

const Stack = createStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        {/* <Stack.Screen name={Screen.SIGNUP} component={SignupScreen} /> */}
        <Stack.Screen name={Screen.GROUPS} component={GroupScreen} />
        <Stack.Screen name={Screen.CREATE_GROUP} component={CreateGroupScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;