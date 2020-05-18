import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import CardComponent from '../../components/GroupCardComponent/index';
import styles from './styles'
import { CREATE_GROUP } from '../../navigation/tab_navigator/stacks/groups/screen-names';



function GroupsScreen({navigation}) {

  // const [heartActive1, setHeartActive1] = useState(false)
  let hearts = [true, false, true]

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
      {groupComponents(hearts)}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate(CREATE_GROUP)}
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
          heartActiveCallback={(index) => {hearts[index] = !hearts[index]; /*console.log(hearts)*/}} 
          heartActive={hearts[i]}
          index = {i}
          heartStatus ={heartStatuses[i]}
        />
      )
    } 
    return list
  }

}

export default GroupsScreen;