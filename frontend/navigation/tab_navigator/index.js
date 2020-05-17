import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Screen from './screen-names';
import MeetingsStackScreen from './stacks/meetings/index';
import GroupsStackScreen from './stacks/groups/index';
import ProfileStackScreen from './stacks/profile/index';

const Tab = createMaterialBottomTabNavigator();

function TabNavigator() {
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
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
