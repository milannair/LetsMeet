import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Screen from './screen-names';
import GroupsScreen from '../../../../screens/GroupsScreen/index';
import CreateGroupScreen from '../../../../screens/CreateGroupScreen/index';

const GroupsStack = createStackNavigator();

function GroupsStackScreen() {
  return (
    <GroupsStack.Navigator headerMode='none'>
      <GroupsStack.Screen name={Screen.GROUPS} component={GroupsScreen} />
      <GroupsStack.Screen name={Screen.CREATE_GROUP} component={CreateGroupScreen} />
      {/* <GroupsStack.Screen name={Screen.GROUP} component={} /> */}
    </GroupsStack.Navigator>
  );
}

export default GroupsStackScreen;