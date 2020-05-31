import React, { useState, useEffect } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import CardComponent from '../../components/GroupCardComponent/index';
import styles from './styles'
import { CREATE_GROUP} from '../../navigation/tab_navigator/stacks/groups/screen-names';
import {getUserGroups} from '../../controllers/GroupController'
import { useIsFocused } from '@react-navigation/native';

const userId = '5ec07929b5169a2a249e2d95'
let userGroups = {}

function GroupsScreen({route, navigation}) {
  const [groupsDetails, setGroupDetails] = useState([]);
  const [userId, setUserId] = useState('');

  const isFocused = useIsFocused();

  useEffect( () => {
    const getGroups = async () =>{
      try {
        const userId = await AsyncStorage.getItem('userId');
        setUserId(userId);
        setGroupDetails(await getUserGroups(userId));
      } catch (error) {
        console.error(error);
      }
    }
    getGroups()
   }, [isFocused])

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
    for (let i = 0; i < groupsDetails.length; i++) {
      list.push (
        <CardComponent 
          navigation={navigation}
          key={"GroupCard" + i}
          groupName={groupsDetails[i].name} 
          groupId = {groupsDetails[i]._id}
          userId = {userId}
          heartActiveCallback={(index) => console.log("Heart does nothing for now")} 
          index = {i}
          heartStatus ={Math.random() >= 0.5}
        />
      )
    } 
    return list
  }

}

export default GroupsScreen;