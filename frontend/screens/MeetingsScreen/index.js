import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Appbar, List} from 'react-native-paper';
import styles from './styles';


import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
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
  );

  const SecondRoute = () => (
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
  );

function MeetingsScreen({ navigation }) {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'CONFIRMED' },
        { key: 'second', title: 'TENTATIVE' },
    ]);
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

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
        
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
          />
        </View>
    );
}
export default MeetingsScreen;