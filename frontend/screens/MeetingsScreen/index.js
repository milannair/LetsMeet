import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Appbar, List} from 'react-native-paper';
import styles from './styles';


import { TabView, SceneMap } from 'react-native-tab-view';

function MeetingsScreen({ navigation }) {
    return (
        <View style={styles.container}>
          <Appbar.Header style={styles.navbar} >
            <Appbar.Content
              title="LetsMeet"
            />
            <Appbar.Action 
              icon="dots-vertical" 
              color="white" 
              size={20}
              onPress={()=> alert("Will eventually take you to the settings screen")}
            />
          </Appbar.Header>


        <List.Section>
            <List.Subheader>Tuesday, May 5th</List.Subheader>
            <List.Item
            title="CSE 403 GROUP(group name)"
            />
            <List.Item
            title="Team Meeting(meeting name)"
            />
            <List.Item
            title="3:00 PM - 7:00 PM"
            />
        </List.Section>
         

        <List.Section>
        <List.Subheader>Friday, May 8th</List.Subheader>
        <List.Item
            title="CSE 403 GROUP(group name)"
        />
        <List.Item
            title="Team Meeting(meeting name)"
        />
        <List.Item
            title="3:00 PM - 7:00 PM"
        />
        </List.Section>
        
          
        </View>
    );
}
export default MeetingsScreen;