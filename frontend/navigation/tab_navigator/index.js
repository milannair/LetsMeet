import React, { useState, useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Screen from './screen-names';
import MeetingsStackScreen from './stacks/meetings/index';
import GroupsStackScreen from './stacks/groups/index';
import ProfileStackScreen from './stacks/profile/index';
import useSocket from '../../hooks/UseSocket/index';

const Tab = createMaterialBottomTabNavigator();

const TABS = {
  Meetings: 0,
  Groups: 1,
  Notifications: 2,
  Profile: 3
}

var currTab = TABS.Meetings;
const setCurrTab = (tab) => currTab = tab;

function TabNavigator() {
  const [numNewGroupRequests, setNumNewGroupRequests] = useState(0);
  const [numNewMeetingRequests, setNumNewMeetingRequests] = useState(0);

  useSocket('add group request', () => {
    if (currTab != TABS.Notifications) {
      setNumNewGroupRequests((prev) => prev + 1);
    }
  });

  useSocket('remove group request', () => {
    setNumNewGroupRequests((prev) => {
      if (currTab != TABS.Notifications) {
        if (prev > 0) {
          return prev - 1;
        } else {
          return 0;
        }
      }
    });
  });

  useSocket('add meeting request', () => {
    if (currTab != TABS.Groups) {
      setNumNewMeetingRequests((prev) => prev + 1);
    }
  });

  useSocket('remove meeting request', () => {
    setNumNewMeetingRequests((prev) => {
      if (currTab != TABS.Groups) {
        if (prev > 0) {
          return prev - 1;
        } else {
          return 0;
        }
      }
    })
  });

  return (
    <Tab.Navigator
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
        listeners={{
          tabPress: (e) => {
            setCurrTab(TABS.Meetings);
          },
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
          tabBarBadge: numNewMeetingRequests > 0 ? numNewMeetingRequests : null
        }}
        listeners={{
          tabPress: (e) => {
            setCurrTab(TABS.Groups);
            setNumNewMeetingRequests(0);
          },
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
            setCurrTab(TABS.Profile);
            setNumNewGroupRequests(0);
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
