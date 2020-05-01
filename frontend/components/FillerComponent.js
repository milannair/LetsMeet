import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import userController from '../controllers/FillerController';

function FillerComponent({ text }) {
  // state
  const [count, setCount] = useState(1);

  // use effect (called when component loads)
  useEffect(() => {
    // const currUser = userController.getUser();
    // setUser(currUser);
  });

  const handleButtonPress = () => {
    setCount(count + 1);
    alert('You pressed the button ' + count + ' times!');
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={handleButtonPress}
        mode='contained'
        style={styles.button}
      >
        {text}
      </Button>
    </View>
  );
}

// styling
const styles = StyleSheet.create({
  container: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'black',
    width: '50%'
  }
});

export default FillerComponent;