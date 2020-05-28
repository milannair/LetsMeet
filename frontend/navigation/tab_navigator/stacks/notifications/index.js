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
        initialParams={{
          notifications: ["Dummy notification 1", "Dummy notification 2"],
        }}
      />
    </NotificationsStack.Navigator>
  );
}

export default NotificationsStackScreen;
