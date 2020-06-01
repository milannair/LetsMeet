import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Screen from './screen-names';
import NotificationsScreen from "../../../../screens/NotificationsScreen";

const NotificationsStack = createStackNavigator();

function NotificationsStackScreen() {
  return (
    <NotificationsStack.Navigator headerMode='none'>
      <NotificationsStack.Screen
        name={Screen.NOTIFICATIONS}
        component={NotificationsScreen}
      />
    </NotificationsStack.Navigator>
  );
}

export default NotificationsStackScreen;
