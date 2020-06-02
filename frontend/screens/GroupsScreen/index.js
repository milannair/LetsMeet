import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import CardComponent from '../../components/GroupCardComponent/index';
import AppbarComponent from "../../components/AppbarComponent/index";
import styles from './styles'
import { CREATE_GROUP} from '../../navigation/tab_navigator/stacks/groups/screen-names';
import {getUserGroups} from '../../controllers/GroupController'
import { AsyncStorage } from "react-native";
import { useIsFocused } from '@react-navigation/native';

let userGroups = {}

function GroupsScreen({route, navigation}) {
  const [userId, setUserId] = useState(null);
  const [groupsDetails, setGroupDetails] = useState([])
  const [groupsUpdated, setGroupsUpdated] = useState(true)
  const isFocused = useIsFocused();
  
  useEffect( () => {
    const getGroups = async () =>{
      const id = await AsyncStorage.getItem('userId');
      setUserId(id);

      setGroupDetails(await getUserGroups(id));
      setGroupsUpdated(false)
      if(route.params && route.params.reload) {
        route.params.reload = false
      }
    }
    getGroups();

  }, [isFocused])

  return (
    <View style={styles.container}>
      <AppbarComponent />
      <ScrollView style={{flex: 1, flexDirection: 'column'}} scrollEnabled={true}>
        {groupComponents()}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() =>{navigation.navigate(CREATE_GROUP, {userId: userId});}}
      />
    </View>
  );

  function groupComponents() {
    let list = []
    if (groupsDetails.length === 0) {
      list.push(<Text style={styles.message} key={0}>You don't have any groups. Tap the floating + button to create a group.</Text>);
    }
    for (let i = 0; i < groupsDetails.length; i++) {
      list.push (
        <CardComponent 
          navigation={navigation}
          key={"GroupCard" + i}
          groupName={groupsDetails[i].name} 
          groupId = {groupsDetails[i]._id}
          userId = {userId}
          index = {i}
        />
      )
    } 
    return list
  }

}

export default GroupsScreen;