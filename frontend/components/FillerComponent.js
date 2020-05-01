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
    <View>
      <Button
        onPress={handleButtonPress}
        mode='contained'
      >
        {text}
      </Button>
    </View>
  );
}

// styling
const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontSize: 24,
    marginBottom: '20px',
  }
});

export default FillerComponent;