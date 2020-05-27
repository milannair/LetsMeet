import React, { useState } from 'react';
import styles from './styles';
import { View } from 'react-native';
import ScheduleComponent from '../../components/ScheduleComponent/index';
import { Menu, Button, Appbar } from 'react-native-paper';
import moment from 'moment';

function EditScheduleScreen({ route, navigation }) {
  // const { user } = route.params;
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startTimeMenuVisible, setStartTimeMenuVisible] = useState(false);
  const [endTimeMenuVisible, setEndTimeMenuVisible] = useState(false);

  const openStartTimeMenu = () => setStartTimeMenuVisible(true);
  const closeStartTimeMenu = () => setStartTimeMenuVisible(false);
  const openEndTimeMenu = () => setEndTimeMenuVisible(true);
  const closeEndTimeMenu = () => setEndTimeMenuVisible(false);

  const startTimeMenuOptions = () => {
    const firstMoment = moment().startOf('day');
    const lastMoment = endTime ? moment(endTime) : firstMoment.clone().add(1, 'day');
    const fifteenMinIntervals = lastMoment.diff(firstMoment, 'minutes') / 15;
    const optionComponents = [];
    optionComponents.push(
      <Menu.Item 
        title={firstMoment.format('LT')} 
        onPress={() => setStartTime(firstMoment.toDate())}
      />
    );
    let prev = firstMoment;
    for (let i = 0; i < fifteenMinIntervals - 1; i++) {
      const curr = prev.clone().add(15, 'minutes');
      optionComponents.push(
        <Menu.Item 
          title={curr.format('LT')} 
          onPress={() => setStartTime(curr.toDate())}
        />
      );
      prev = curr;
    }
    return optionComponents;
  }

  const endTimeMenuOptions = () => {
    const firstMoment = startTime ? moment(startTime) : moment().startOf('day');
    const lastMoment = moment().endOf('day');
    const fifteenMinIntervals = lastMoment.diff(firstMoment, 'minutes') / 15;
    const optionComponents = [];
    let prev = firstMoment;
    for (let i = 0; i < fifteenMinIntervals; i++) {
      const curr = prev.clone().add(15, 'minutes');
      optionComponents.push(
        <Menu.Item 
          title={curr.format('LT')} 
          onPress={() => setEndTime(curr.toDate())}
        />
      );
      prev = curr;
    }
    return optionComponents;
  }

  return (
    <View style={styles.container}>
      <Appbar>

      </Appbar>
      <View style={styles.topContainer}>
        <Menu
          visible={startTimeMenuVisible}
          onDismiss={closeStartTimeMenu}
          anchor={
            <Button mode='outlined' onPress={openStartTimeMenu}>
              { startTime ? moment(startTime).format('LT') : 'Select Start Time'}
            </Button>
          }
        >
          {startTimeMenuOptions()}
        </Menu>
        <Menu
          visible={endTimeMenuVisible}
          onDismiss={closeEndTimeMenu}
          anchor={
            <Button mode='outlined' onPress={openEndTimeMenu}>
              { endTime ? moment(endTime).format('LT') : 'Select End Time' }
            </Button>
          }
        >
          {endTimeMenuOptions()}
        </Menu>
      </View>
    </View>
  );
}

export default EditScheduleScreen;