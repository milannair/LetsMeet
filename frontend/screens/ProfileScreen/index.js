import React, { useState, useEffect } from 'react';
import { View, AsyncStorage } from 'react-native';
import {
  List, Text, Divider, FAB,
} from 'react-native-paper';
import styles from './styles';
import { getUser } from '../../controllers/UserController';
import * as Screen from '../../navigation/tab_navigator/stacks/profile/screen-names';
import ScheduleComponent from '../../components/ScheduleComponent/index'
import Day from '../../enums/Day';
import { useIsFocused } from '@react-navigation/native'
import AppbarComponent from "../../components/AppbarComponent";

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
        const user = await getUser(await AsyncStorage.getItem('userId'));
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
      <AppbarComponent title='Profile' />
      <List.Item
        style={styles.item}
        title={user.displayName}
        description={user.email + ' / ' + user.username}
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
