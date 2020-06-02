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

    function tentativeMeetingComponents() {
      let list = []
      for (let i = 0; i < meetingsDetails.length; i++) {
        // parse Date
        let start = moment(meetingsDetails[i].startTime).format("LT");
        let end = moment(meetingsDetails[i].endTime).format("LT");
        let day = moment(meetingsDetails[i].startTime).format("dddd, MMMM Do");
        if (!(meetingsDetails[i].confirmed)) {
          list.push (
            <List.Section key={"unconfirmed " + i}>
              <List.Subheader 
                style={{
                    color:'black',
                    fontSize: 18,
                  }}
                  key={"unconfirmed header " + i}>
                {day}
              </List.Subheader>
                <List.Item
                  title={meetingsDetails[i].groupName}
                  description={meetingsDetails[i].name + '\n' + `${start} - ${end}`}
                  key={"unconfirmed meeting " + i}
                />
            </List.Section>
          )
        }     
      } 
      return list
    }

    function confirmedMeetingComponents() {
      let list = []
      for (let i = 0; i < meetingsDetails.length; i++) {
        // parse Date
        let start = moment(meetingsDetails[i].startTime).format("LT");
        let end = moment(meetingsDetails[i].endTime).format("LT");
        let day = moment(meetingsDetails[i].startTime).format("dddd, MMMM Do");
        
        if (meetingsDetails[i].confirmed == true) {
          list.push (
            <List.Section key={"confirmed " + i}>
              <List.Subheader 
                style={{
                    color:'black',
                    fontSize: 18,
                  }}
                  key={"confirmed header " + i}>
                {day}
              </List.Subheader>
              <List.Item
                title={meetingsDetails[i].groupName}
                description={meetingsDetails[i].name + '\n' + `${start} - ${end}`}
                key={"confirmed meeting " + i}
              />
            </List.Section>
          )
        }      
      } 
      return list
    }
}
export default MeetingsScreen;