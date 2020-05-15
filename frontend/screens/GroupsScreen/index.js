import React, { useState } from 'react';
import { View } from 'react-native';
import CardComponent from '../../components/CardComponent';
import styles from './styles'



function GroupsScreen() {

  // const [heartActive1, setHeartActive1] = useState(false)
  let hearts = [true, false, true]

  return (
    <View style={styles.container}>
      {groupComponents(hearts)}
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