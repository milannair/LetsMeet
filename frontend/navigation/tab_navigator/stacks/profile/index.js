import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Screen from './screen-names';
import ProfileScreen from '../../../../screens/ProfileScreen/index';

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator headerMode='none'>
      <ProfileStack.Screen name={Screen.REFERENCE} component={ProfileScreen} />
      {/* <ProfileStack.Screen name={Screen.PROFILE} component={} />
      <ProfileStack.Screen name={Screen.EDIT_PROFILE} component={} />
      <ProfileStack.Screen name={Screen.NOTIFICATIONS} component={} /> */}
    </ProfileStack.Navigator>
  );
}

export default ProfileStackScreen;