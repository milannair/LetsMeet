import React, { useState, useEffect} from 'react';
import { View} from 'react-native';
import { List, useTheme } from 'react-native-paper';
import styles from './styles';
import {getUserMeetingsWithGroups} from '../../controllers/MeetingController';
import moment from 'moment';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AppbarComponent from "../../components/AppbarComponent";
import { AsyncStorage } from "react-native";

// todo: probably want to change this later on

function MeetingsScreen({route, navigation }) {
  const [userId, setUserId] = useState(null);
    const { colors } = useTheme();

    // confirmed and tentative tab
    const FirstRoute = () => (
      confirmedMeetingComponents()
    );

    const SecondRoute = () => (
      tentativeMeetingComponents()
    );

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'CONFIRMED' },
        { key: 'second', title: 'TENTATIVE' },
    ]);
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    // meeting data
    const[meetingsDetails, setMeetingDetails] = useState([])
    const[meetingsUpdated, setMeetingsUpdated] = useState(true)

    useEffect( () => {
      const getId = async () => {
        const id = await AsyncStorage.getItem('userId');
        setUserId(id);
      }
  
      if(!userId) {
        getId();
      }
      
      const getMeetings = async () =>{
        if(meetingsUpdated || (route.params && route.params.reload)) {
          setMeetingDetails(await getUserMeetingsWithGroups(userId));
          setMeetingsUpdated(false);
          if(route.params && route.params.reload) {
            route.params.reload = false;
          }
        }
      }
      getMeetings();

    })

    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: colors.accent, 
          height: 5
        }}
        style={{ backgroundColor: colors.primary }}
      />
    );

    return (
        <View style={styles.container}>
          <AppbarComponent />
        
          <TabView 
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
          />
        </View>
    );

    function compareMeetingsByDate(a, b) {
      let aStart = moment(a.startTime);
      let bStart = moment(b.startTime);
 
      if (aStart.isBefore(bStart)) {
        return -1;
      }
      if (aStart.isAfter(bStart)) {
        return 1;
      }
      return 0;
    }

    function tentativeMeetingComponents() {
      return confirmedMeetingComponentsImpl(false);
    }

    function confirmedMeetingComponents() {
      return confirmedMeetingComponentsImpl(true);
    }

    function confirmedMeetingComponentsImpl(isConfirmed) {
      // sort meetings based on startTime
      meetingsDetails.sort(compareMeetingsByDate);

      let list = []
      
      // map day string to an array of meetings
      let dateToMeetings = {}
      for (let i = 0; i < meetingsDetails.length; i++) {
        // Only keep the confirmed/tentative meeting.
        if (meetingsDetails[i].confirmed != isConfirmed) {
          continue;
        }
        let day = moment(meetingsDetails[i].startTime).format("dddd, MMMM Do");

        if (dateToMeetings[day] == null) {
          dateToMeetings[day] = [];
        }
        dateToMeetings[day].push(meetingsDetails[i]);
      }

      for (let [keyDay, valueMeetings] of Object.entries(dateToMeetings)) {
        
        let subList = []
        for (let i=0; i<valueMeetings.length; i++) {
          let start = moment(valueMeetings[i].startTime).format("LT");
          let end = moment(valueMeetings[i].endTime).format("LT");
          subList.push(<List.Item
            title={valueMeetings[i].groupName}
            description={valueMeetings[i].name + '\n' + `${start} - ${end}`}
            key={"confirmed meeting " + i}
          />);
        }

        list.push (
          <List.Section key={keyDay}>
            <List.Subheader 
              style={{
                  color:'black',
                  fontSize: 18,
                }}
                key={keyDay}>
              {keyDay}
            </List.Subheader>
            {subList}
          </List.Section>
        ) 
      }
      return list
    }
}
export default MeetingsScreen;