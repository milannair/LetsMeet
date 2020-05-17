import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Screen from './screen-names';
import ReferenceScreen from '../../../../screens/reference_screen/index';
import NotificationsScreen from "../../../../screens/NotificationsScreen";

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator headerMode='none'>
      <ProfileStack.Screen name={Screen.REFERENCE} component={ReferenceScreen} />
      {/* <ProfileStack.Screen name={Screen.PROFILE} component={} />
      <ProfileStack.Screen name={Screen.EDIT_PROFILE} component={} /> */}
      <ProfileStack.Screen name={Screen.NOTIFICATIONS} component={NotificationsScreen} />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackScreen;