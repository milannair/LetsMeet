import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import userController from '../controllers/SignupController';

function PasswordFieldComponent({ text }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textField}
        label={text}
        secureTextEntry
        autoCorrect={false}
      />
    </View>
  );
}

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  textField: {
    width: '90%',
    justifyContent: 'center',
  },
});

export default PasswordFieldComponent;
