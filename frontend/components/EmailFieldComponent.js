import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import userController from '../controllers/SignupController';

function EmailFieldComponent() {
  const [validEmail, setValid] = useState(false);

  const handleChangeText = (e) => {
    if (e.length !== 0) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textField}
        label="Email"
        autoCompelteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        onChange={handleChangeText}
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
