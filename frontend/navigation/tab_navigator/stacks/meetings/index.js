import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Screen from './screen-names';
import ReferenceScreen from '../../../../screens/reference_screen/index';

const MeetingsStack = createStackNavigator();

function MeetingsStackScreen() {
  return (
    <MeetingsStack.Navigator headerMode='none'>
      <MeetingsStack.Screen name={Screen.REFERENCE} component={ReferenceScreen} />
      {/* <MeetingsStack.Screen name={Screen.MEETINGS} component={} />
      <MeetingsStack.Screen name={Screen.NOTIFICATIONS} component={} /> */}
    </MeetingsStack.Navigator>
  );
}

export default MeetingsStackScreen;