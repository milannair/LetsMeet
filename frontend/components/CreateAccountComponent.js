import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import userController from '../controllers/SignupController';
import EmailFieldComponent from './EmailFieldComponent';

function isFormValid() {
  return EmailFieldComponent.validEmail;
}

function CreateAccountComponent() {
  const handleButtonPress = () => {
    console.log('Pressed');
    console.log(isFormValid);
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={handleButtonPress}
        mode="contained"
        style={styles.button}
        disabled={!isFormValid}
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
