import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import CardComponent from '../../components/GroupCardComponent/index';
import styles from './styles'
import { CREATE_GROUP } from '../../navigation/screen-names';
import {getUserGroups} from '../../controllers/GroupController'

const userId = '5ec07929b5169a2a249e2d95'
let userGroups = {}

function GroupsScreen({route, navigation}) {

  const[groupsDetails, setGroupDetails] = useState([])
  const[groupsUpdated, setGroupsUpdated] = useState(true)

  useEffect( () => {
    const getGroups = async () =>{
      if(groupsUpdated || (route.params && route.params.reload)) {
        setGroupDetails(await getUserGroups(userId));
        setGroupsUpdated(false)
        if(route.params && route.params.reload) {
          route.params.reload = false
        }
      }
    }
    getGroups()
   })

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.navbar} >
        <Appbar.Content
          title="LetsMeet"
        />
        <Appbar.Action 
          icon="bell-ring" 
          color="yellow" 
          size={20} 
          onPress={()=> alert("Will eventually take you to the notifications screen")}
          />
        <Appbar.Action 
          icon="dots-vertical" 
          color="white" 
          size={20}
          onPress={()=> alert("Will eventually take you to the settings screen")}
        />
      </Appbar.Header>
      {groupComponents2()}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() =>{navigation.navigate(CREATE_GROUP, {userId: userId});}}
      />
    </View>
  );

  function groupComponents(heartStatuses) {
    let list = []
    for (let i = 0; i < heartStatuses.length; i++) {
      list.push (
        <CardComponent 
          key={"GroupCard" + i}
          groupName="No name bro" 
          heartActiveCallback={(index) => {hearts[index] = !hearts[index];}} 
          heartActive={hearts[i]}
          index = {i}
          heartStatus ={heartStatuses[i]}
        />
      )
    } 
    return list
  }

  function groupComponents2() {
    let list = []
    for (let i = 0; i < groupsDetails.length; i++) {
      list.push (
        <CardComponent 
          key={"GroupCard" + i}
          groupName={groupsDetails[i].name} 
          heartActiveCallback={(index) => console.log("Heart does nothing for now")} 
          heartActive={Math.random() >= 0.5}
          index = {i}
          heartStatus ={Math.random() >= 0.5}
        />
      )
    } 
    return list
  }

}

export default GroupsScreen;