import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Screen from './screen-names';
import ProfileScreen from '../../../../screens/ProfileScreen/index';
import EditProfileScreen from '../../../../screens/EditProfileScreen/index';
import EditScheduleScreen from '../../../../screens/EditScheduleScreen';

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator headerMode='none'>
      <ProfileStack.Screen name={Screen.PROFILE} component={ProfileScreen} />
      <ProfileStack.Screen name={Screen.EDIT_PROFILE} component={EditProfileScreen} />
      <ProfileStack.Screen name={Screen.EDIT_SCHEDULE} component={EditScheduleScreen} />
      {/* <ProfileStack.Screen name={Screen.NOTIFICATIONS} component={} /> */}
    </ProfileStack.Navigator>
  );
}

export default ProfileStackScreen;
