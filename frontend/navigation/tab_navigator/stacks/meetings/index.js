import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Screen from './screen-names';
import MeetingsScreen from '../../../../screens/MeetingsScreen/index';

const MeetingsStack = createStackNavigator();

function MeetingsStackScreen() {
  return (
    <MeetingsStack.Navigator headerMode='none'>
      <MeetingsStack.Screen name={Screen.MEETINGS} component={MeetingsScreen} />
      {/* <MeetingsStack.Screen name={Screen.MEETINGS} component={} />
      <MeetingsStack.Screen name={Screen.NOTIFICATIONS} component={} /> */}
    </MeetingsStack.Navigator>
  );
}

export default MeetingsStackScreen;