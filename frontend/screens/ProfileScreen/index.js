import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {
  List, Text, Appbar, Divider, FAB,
} from 'react-native-paper';
import styles from './styles';
import { getUser } from '../../controllers/UserController';
import * as Screen from '../../navigation/tab_navigator/stacks/profile/screen-names';
import ScheduleComponent from '../../components/ScheduleComponent/index'
import Day from '../../enums/Day';
import moment from 'moment';
import Schedule from '../../models/Schedule';
import { useIsFocused } from '@react-navigation/native'

function Profile({ navigation }) {
  const [user, setUser] = useState(JSON.parse('{"username" : "", "email" : "", "displayName" : ""}'));

  const isFocused = useIsFocused();
  const firstDay = Day.SUNDAY;
  const lastDay = Day.SATURDAY;
  const firstHour = 8;
  const lastHour = 22; 

  useEffect(() => {
    const showUser = async () => {
      try {
        const user = await getUser('5ec078fdb5169a2a249e2d94');
        console.log(user);
        if (user !== undefined) {
          if (user.schedule) {
            user.schedule = user.schedule.map((timeSlot) => {
              return {
                startTime: new Date(timeSlot.startTime),
                endTime: new Date(timeSlot.endTime)
              };
            });
          }
          setUser(user);
        } else {
          console.error('user not found');
        }
      } catch (error) {
        console.error(error);
      }
    };
    showUser();
  }, [isFocused]);

  const handleSettingsPress = () => {
    console.log('settings pressed');
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
        <Appbar.Action icon="dots-vertical" onPress={() => handleSettingsPress} color="#f9f9f9" />
      </Appbar.Header>
      <List.Item
        style={styles.item}
        background='white'
        title={user.displayName}
        description={user.email}
        left={() => <List.Icon icon="account-circle" />}
        right={() => <Text>Tap to edit</Text>}
        onPress={() => navigation.navigate(Screen.EDIT_PROFILE)}
      />
      <Divider />
      <Text style={styles.text}>Available Times</Text>
      <ScheduleComponent
        firstDay={firstDay}
        lastDay={lastDay}
        firstHour={firstHour}
        lastHour={lastHour}
        divideHours={true}
        schedule={user.schedule ? user.schedule : []}
      />
      <FAB
        style={styles.fab}
        icon="pencil"
        onPress={() => navigation.navigate(Screen.EDIT_SCHEDULE, { schedule: user.schedule ? user.schedule : [] })}
      />
    </View>
  );
}

export default Profile;
