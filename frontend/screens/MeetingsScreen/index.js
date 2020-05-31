import React, { useState, useEffect} from 'react';
import { View, AsyncStorage} from 'react-native';
import { Appbar, List, useTheme } from 'react-native-paper';
import styles from './styles';
import {getUserMeetingsWithGroups} from '../../controllers/MeetingController';
import moment from 'moment';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useIsFocused } from '@react-navigation/native';

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
            <List.Section key={i}>
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
            <List.Section key={i}>
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