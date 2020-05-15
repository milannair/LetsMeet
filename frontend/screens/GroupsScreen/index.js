import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import CardComponent from '../../components/GroupCardComponent/index';
import styles from './styles'



function GroupsScreen() {

  // const [heartActive1, setHeartActive1] = useState(false)
  let hearts = [true, false, true]

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
      {groupComponents(hearts)}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => alert("Congrats! Pressing the FAB does nothing at this point")}
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