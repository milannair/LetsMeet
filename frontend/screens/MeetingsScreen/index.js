import React, { useState, useEffect} from 'react';
import { View, AsyncStorage} from 'react-native';
import { List, useTheme } from 'react-native-paper';
import styles from './styles';
import {getUserMeetingsWithGroups} from '../../controllers/MeetingController';
import moment from 'moment';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useIsFocused } from '@react-navigation/native';
import AppbarComponent from "../../components/AppbarComponent";

function MeetingsScreen({ navigation }) {
    const { colors } = useTheme();
    const isFocused = useIsFocused();

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

    useEffect(() => {
      const getMeetings = async () => {
        try {
          const userId = await AsyncStorage.getItem('userId');
          setMeetingDetails(await getUserMeetingsWithGroups(userId));
        } catch (error) {
          console.error(error);
        }
      }
      getMeetings()
    }, [isFocused])

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