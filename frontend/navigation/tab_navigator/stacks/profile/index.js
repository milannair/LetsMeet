import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Screen from './screen-names';
import ProfileScreen from '../../../../screens/ProfileScreen/index';
import EditProfileScreen from '../../../../screens/EditProfileScreen/index';
import LoginScreen from '../../../../screens/LoginScreen/index';

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator headerMode='none'>
      <ProfileStack.Screen name={Screen.PROFILE} component={ProfileScreen} />
      <ProfileStack.Screen name={Screen.EDIT_PROFILE} component={EditProfileScreen} />
      <ProfileStack.Screen name={Screen.LOGIN} component={LoginScreen} />
      {/* <ProfileStack.Screen name={Screen.NOTIFICATIONS} component={} /> */}
    </ProfileStack.Navigator>
  );
}

export default ProfileStackScreen;
