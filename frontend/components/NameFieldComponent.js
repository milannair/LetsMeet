import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import userController from '../controllers/SignupController';

function EmailFieldComponent({ text }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textField}
        label={text}
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
  },
  textField: {
    width: '90%',
    justifyContent: 'center',
  },
});

export default EmailFieldComponent;