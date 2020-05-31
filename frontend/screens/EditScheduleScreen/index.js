import React, { useState } from 'react';
import styles from './styles';
import { View } from 'react-native';
import ScheduleComponent from '../../components/ScheduleComponent/index';
import { Menu, Button, Appbar } from 'react-native-paper';
import moment from 'moment';
import Day from '../../enums/Day';
import RemoveTimeSlotDialog from '../../components/RemoveTimeSlotDialog';
import { setUserSchedule } from '../../controllers/UserController';

function EditScheduleScreen({ route, navigation }) {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startTimeMenuVisible, setStartTimeMenuVisible] = useState(false);
  const [endTimeMenuVisible, setEndTimeMenuVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [schedule, setSchedule] = useState(route.params.schedule);
  const [selectedDay, setSelectedDay] = useState(Day.SUNDAY);

  const openStartTimeMenu = () => setStartTimeMenuVisible(true);
  const closeStartTimeMenu = () => setStartTimeMenuVisible(false);
  const openEndTimeMenu = () => setEndTimeMenuVisible(true);
  const closeEndTimeMenu = () => setEndTimeMenuVisible(false);
  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  const handleAddToSchedule = () => {
    if (startTime && endTime) {
      const startTimeMoment = moment(startTime);
      const endTimeMoment = moment(endTime);
      setSchedule([
        ...schedule,
        {
          startTime: startTimeMoment.day(selectedDay).toDate(),
          endTime: endTimeMoment.day(selectedDay).toDate()
        }
      ]);
    }
  };

  const handleSetStartTime = (date) => {
    setStartTime(date);
    closeStartTimeMenu();
  };

  const handleSetEndTime = (date) => {
    setEndTime(date);
    closeEndTimeMenu();
  };

  const handleDismissDialog = () => {
    hideDialog();
  };

  const handleConfirmDialog = () => {
    const scheduleCopy = [...schedule];
    let index = -1;
    scheduleCopy.forEach((timeSlot, i) => {
      if (moment(timeSlot.startTime).isSame(dialogData.start) && moment(timeSlot.endTime).isSame(dialogData.end)) {
        index = i;
      }
    });
    scheduleCopy.splice(index, 1);
    setSchedule(scheduleCopy);
    hideDialog();
  };

  const handleTimeSlotPress = (day, start, end) => {
    switch (day) {
      case Day.SUNDAY:
        day = 'Sunday';
        break;
      case Day.MONDAY:
        day = 'Monday';
        break;
      case Day.TUESDAY:
        day = 'Tuesday';
        break;
      case Day.WEDNESDAY:
        day = 'Wednesday';
        break;
      case Day.THURSDAY:
        day = 'Thursday';
        break;
      case Day.FRIDAY:
        day = 'Friday';
        break;
      case Day.SATURDAY:
        day = 'Saturday';
        break;
      default:
        throw 'Invalid day';
    }
    setDialogData({
      day: day,
      start: start,
      end: end
    });
    showDialog();
  };

  const handleSave = async () => {
    try {
      await setUserSchedule('5ec078fdb5169a2a249e2d94', schedule);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const startTimeMenuOptions = () => {
    const firstMoment = moment().startOf('day');
    const lastMoment = endTime ? moment(endTime) : firstMoment.clone().add(1, 'day');
    const fifteenMinIntervals = lastMoment.diff(firstMoment, 'minutes') / 15;
    const optionComponents = [];
    optionComponents.push(
      <Menu.Item 
        title={firstMoment.format('LT')} 
        onPress={() => handleSetStartTime(firstMoment.toDate())}
        key={0}
      />
    );
    let prev = firstMoment;
    for (let i = 0; i < fifteenMinIntervals - 1; i++) {
      const curr = prev.clone().add(15, 'minutes');
      optionComponents.push(
        <Menu.Item 
          title={curr.format('LT')} 
          onPress={() => handleSetStartTime(curr.toDate())}
          key={i + 1}
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
          onPress={() => handleSetEndTime(curr.toDate())}
          key={i}
        />
      );
      prev = curr;
    }
    return optionComponents;
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction color='white' onPress={navigation.goBack} />
        <Appbar.Content color='white' title='LetsMeet' />
        <Button color='white' onPress={handleSave}>SAVE</Button>
      </Appbar.Header>
      <View style={styles.topContainer}>
        <Menu
          visible={startTimeMenuVisible}
          onDismiss={closeStartTimeMenu}
          anchor={
            <Button mode='outlined' onPress={openStartTimeMenu}>
              { startTime ? moment(startTime).format('LT') : 'Select Start'}
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
              { endTime ? moment(endTime).format('LT') : 'Select End' }
            </Button>
          }
        >
          {endTimeMenuOptions()}
        </Menu>
        <Button icon='plus' mode='contained' onPress={handleAddToSchedule}>
          Add
        </Button>
      </View>
      <View style={styles.bottomContainer}>
        <ScheduleComponent
          firstDay={Day.SUNDAY}
          lastDay={Day.SATURDAY}
          firstHour={0}
          lastHour={23}
          schedule={schedule}
          selectable={true}
          divideHours={true}
          onDayPress={setSelectedDay}
          onTimeSlotPress={handleTimeSlotPress}
          isGroupSchedule={false}
        />
      </View>
      <RemoveTimeSlotDialog
        visible={dialogVisible && dialogData}
        day={dialogData ? dialogData.day : null}
        start={dialogData ? dialogData.start : null}
        end={dialogData ? dialogData.end : null}
        onDismiss={handleDismissDialog}
        onConfirm={handleConfirmDialog}
      />
    </View>
  );
}

export default EditScheduleScreen;