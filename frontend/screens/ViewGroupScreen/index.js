import React, { useState, useEffect } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import styles from './styles';
import { useTheme, Portal, Dialog, Paragraph, Button } from 'react-native-paper';
import ViewGroupComponent from '../../components/ViewGroupComponent/index';
import Day from '../../enums/Day';
import { View, AsyncStorage } from 'react-native';
import { Appbar, Menu, Divider } from 'react-native-paper';
import {getMeetingRequest} from '../../controllers/MeetingRequestController';
import {getUserIdentifiers, removeGroup, getUsersSchedules} from '../../controllers/UserController';
import {getGroupData, removeUserFromGroup} from '../../controllers/GroupController';
import { useFocusEffect } from '@react-navigation/native';
import ScheduleComponent from '../../components/ScheduleComponent/index';
import {GROUPS, ADD_MEMBERS} from '../../navigation/tab_navigator/stacks/groups/screen-names';
import moment from 'moment';
import useSocket from '../../hooks/UseSocket';
import Spinner from 'react-native-loading-spinner-overlay';

function ViewGroupScreen({ route, navigation }) {
  const { colors } = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'meetingRequests', title: 'MEETING REQUESTS'},
    { key: 'groupAvailability', title: 'GROUP AVAILABILITY' }
  ]);
  const [showMenu, setShowMenu] = useState(false);
  const [groupData, setGroupData] = useState({});
  const [updatePage, setUpdatePage] = useState(false);
  const [logData, setLogData] = useState([]);
  const [updateLog, setUpdateLog] = useState(false);
  const [groupSchedule, setGroupSchedule] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [showSpinner, setShowSpinner] = useState(true);

  useFocusEffect(
    React.useCallback( () => {
      setUpdatePage(true);
      setLogData([]);
      setShowSpinner(true);
      return () => {
      };
    }, [])
  );

  useSocket('add meeting request', async (meetingRequestId) => {
    const meetingRequest = await getMeetingRequest(meetingRequestId);
    if (route.params.userId !== meetingRequest.author) {
      const userIdentifiers = (await getUserIdentifiers(meetingRequest.author))[0];
      setLogData((prev) => [...prev, {meetingRequest : meetingRequest, userIdentifiers: userIdentifiers}]);
    }
  });

  const MeetingRequestRoute = () => (
    <ViewGroupComponent 
      route={route} 
      navigation={navigation}
      logData={logData}
      updateLog={updateLog}
      groupData={groupData}   
    />
  );

  const GroupAvailabilityRoute = () => (
    <View style={styles.container}>
      <ScheduleComponent
        firstDay={Day.SUNDAY}
        lastDay={Day.SATURDAY}
        firstHour={0}
        lastHour={23}
        schedule={groupSchedule || []}
        selectable={false}
        divideHours={true}
        onDayPress={null}
        onTimeSlotPress={(day, start, end, countAvailable) => {
          setDialogData({
            day: day,
            start: start,
            end: end,
            countAvailable: countAvailable
          });
          setDialogVisible(true);
        }}
        isGroupSchedule={true}
      />
    </View>
  );

  const getDayString = (day) => {
    switch (day) {
      case Day.SUNDAY:
        return 'Sunday';
      case Day.MONDAY:
        return 'Monday';
      case Day.TUESDAY:
        return 'Tuesday';
      case Day.WEDNESDAY:
        return 'Wednesday';
      case Day.THURSDAY:
        return 'Thursday';
      case Day.FRIDAY:
        return 'Friday';
      case Day.SATURDAY:
        return 'Saturday';
    }
  }


  const renderScene = SceneMap({
    meetingRequests: MeetingRequestRoute,
    groupAvailability: GroupAvailabilityRoute
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.accent, 
        height: 5
      }}
      style={{ backgroundColor: colors.primary }}
    />
  );

  useEffect(() => {
    const getData = async () => {  // get all meetingRequests for this group and their authors
      const data = await getGroupData(route.params.groupId);
      setGroupData(data);
      const meetingRequests = data.meetingRequests;
      let newLogData = [];
      for(let i = 0; i < meetingRequests.length; i++) {
        const meetingRequestId = meetingRequests[i];
        let meetingRequest = await getMeetingRequest(meetingRequestId);
        let userIdentifiers = (await getUserIdentifiers(meetingRequest.author))[0];
        newLogData.push({meetingRequest : meetingRequest, userIdentifiers: userIdentifiers})
      }
      if(newLogData.length === 0) {
        setShowSpinner(false);
      }
      setLogData(newLogData);

      setGroupSchedule(await getUsersSchedules(data.members));
      setShowSpinner(false);
    };

    if(updatePage) {
      getData();
      setUpdatePage(false);
      setUpdateLog(true);
    }
  }, [updatePage]);

  return (
    <View style={styles.container}>
      <Appbar.Header
        style = {{backgroundColor: "#663399"}}
      >
        <Appbar.BackAction color="white" onPress={async () => {await setUpdatePage(false); await setLogData([]); navigation.navigate(GROUPS)}}/>
        <Appbar.Content
          color="white"
          title={groupData.name}
        />
        <Menu
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          anchor={
            <Appbar.Action 
              icon="dots-vertical" 
              color="white" 
              onPress={()=> setShowMenu(true)}
            />
          }
        >
          <Menu.Item onPress={() =>{setShowMenu(false); navigation.navigate(ADD_MEMBERS, {groupData: groupData, userId: route.params.userId})}} title="Members" />
          <Divider />
          <Menu.Item 
            onPress={() => {
              removeGroup(route.params.userId, route.params.groupId);
              removeUserFromGroup(route.params.groupId, route.params.userid);
              navigation.navigate(GROUPS, {reload: true})
            }} 
            title="Leave group" 
          />
        </Menu>
      </Appbar.Header>
      <TabView 
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />

      <Spinner
          visible={showSpinner}
          textContent={'Loading...'}
          textStyle={{
          color: 'white'
        }}
      />

      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
        >
          <Dialog.Title>
            {
              dialogData.countAvailable > 1 ? 
                dialogData.countAvailable + ' members available'
                :
                dialogData.countAvailable + ' member available'
            }  
          </Dialog.Title> 
          <Dialog.Content>
            <Paragraph>
              {getDayString(dialogData.day)}, {moment(dialogData.start).format('LT')} to {moment(dialogData.end).format('LT')}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

export default ViewGroupScreen;