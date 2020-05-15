import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FillerComponent from '../components/FillerComponent';
import CardComponent from '../components/CardComponent';



function GroupsPage() {

  // const [heartActive1, setHeartActive1] = useState(false)
  let hearts = [true, false, true]

  return (
      <View style={styles.container}>
          {/* <CardComponent 
              groupName="No name bro" 
              heartActiveCallback={()=> setHeartActive1(!heartActive1)} 
              heartActive={heartActive1}/> */}
          {groupComponents(hearts)}
          {/* <CardComponent groupName="No name bro" heartActiveCallback= {() => {console.log("printed in parent2")}}/> */}
          {/* <FillerComponent text= 'Buenos Tardes Amigo!' /> */}
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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }
});

export default GroupsPage;