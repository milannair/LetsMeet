import React, { useState, useEffect} from 'react';
import { View} from 'react-native';
import { Appbar, List, useTheme } from 'react-native-paper';
import styles from './styles';
import {getUserMeetingsWithGroups} from '../../controllers/MeetingController';
import moment from 'moment';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

// todo: probably want to change this later on
const userId = '5ec07929b5169a2a249e2d95'

function MeetingsScreen({route, navigation }) {
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
      const getMeetings = async () =>{
        if(meetingsUpdated || (route.params && route.params.reload)) {
          setMeetingDetails(await getUserMeetingsWithGroups(userId));
          setMeetingsUpdated(false)
          if(route.params && route.params.reload) {
            route.params.reload = false
          }
        }
      }
      getMeetings()
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
          <Appbar.Header style={styles.navbar} >
            <Appbar.Content
              title="LetsMeet"
            />
            <Appbar.Action 
              icon="dots-vertical" 
              color="white"
              onPress={()=> alert("Will eventually take you to the settings screen")}
            />
          </Appbar.Header>
        
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
            <List.Section>
              <List.Subheader 
                style={{
                    color:'black',
                    fontSize: 18,
                  }}>
                {day}
              </List.Subheader>
                <List.Item
                  title={meetingsDetails[i].groupName}
                  description={meetingsDetails[i].name + '\n' + `${start} - ${end}`}
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
            <List.Section>
              <List.Subheader 
                style={{
                    color:'black',
                    fontSize: 18,
                  }}>
                {day}
              </List.Subheader>
              <List.Item
                title={meetingsDetails[i].groupName}
                description={meetingsDetails[i].name + '\n' + `${start} - ${end}`}
              />
            </List.Section>
          )
        }      
      } 
      return list
    }
}
export default MeetingsScreen;