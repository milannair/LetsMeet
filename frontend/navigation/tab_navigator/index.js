import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Screen from './screen-names';
import MeetingsStackScreen from './stacks/meetings/index';
import GroupsStackScreen from './stacks/groups/index';
import ProfileStackScreen from './stacks/profile/index';
import useSocket from '../../hooks/UseSocket/index';

const Tab = createMaterialBottomTabNavigator();

function TabNavigator() {
  const [numNewGroupRequests, setNumNewGroupRequests] = useState(0);

  const { sendData } = useSocket('add group request', () => {
    setNumNewGroupRequests((prev) => prev + 1);
    console.log('receive');
  });

  useSocket('remove group request', () => {
    setNumNewGroupRequests((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        return 0;
      }
    });
  });

  return (
    <Tab.Navigator
      // activeColor='#000000'
      // inactiveColor='#464F51'
      shifting
    >
      <Tab.Screen
        name={Screen.MEETINGS}
        component={MeetingsStackScreen}
        options={{
          tabBarColor: '#b57edc',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='calendar-blank' color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={Screen.GROUPS}
        component={GroupsStackScreen}
        options={{
          tabBarColor: '#b57edc',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account-multiple' color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={Screen.PROFILE}
        component={ProfileStackScreen}
        options={{
          tabBarColor: '#b57edc',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account-circle' color={color} size={24} />
          ),
          tabBarBadge: numNewGroupRequests > 0 ? numNewGroupRequests : null
        }}
        listeners={{
          tabPress: (e) => {
            setNumNewGroupRequests(0);
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
