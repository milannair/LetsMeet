import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FillerComponent from '../components/FillerComponent';
import CardComponent from '../components/CardComponent';

function GroupsPage() {
  return (
      <View style={styles.container}>
          <CardComponent groupName="No name bro"/>
          <CardComponent groupName="No name bro"/>
          {/* <FillerComponent text= 'Buenos Tardes Amigo!' /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }
});

export default GroupsPage;