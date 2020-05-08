import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Screen from './screen-names';
import ReferenceScreen from '../../../screens/reference_screen/index';

const GroupsStack = createStackNavigator();

function GroupsStackScreen() {
  return (
    <GroupsStack.Navigator headerMode='none'>
      <GroupsStack.Screen name={Screen.REFERENCE} component={ReferenceScreen} />
      {/* <GroupsStack.Screen name={Screen.GROUPS} component={} />
      <GroupsStack.Screen name={Screen.CREATE_GROUP} component={} />
      <GroupsStack.Screen name={Screen.ADD_MEMBERS} component={} />
      <GroupsStack.Screen name={Screen.GROUP} component={} />
      <GroupsStack.Screen name={Screen.NOTIFICATIONS} component={} /> */}
    </GroupsStack.Navigator>
  );
}

export default GroupsStackScreen;