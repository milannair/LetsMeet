import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import userController from '../controllers/SignupController';

function CreateAccountComponent() {
  return (
    <View style={styles.container}>
      <Button
        // onPress={handleButtonPress}
        mode="contained"
        style={styles.button}
      >
        Create Account
      </Button>
    </View>
  );
}

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '90%',
  },
});

export default CreateAccountComponent;