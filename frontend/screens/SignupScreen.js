import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
// import EmailFieldComponent from '../components/EmailFieldComponent';
import PasswordFieldComponent from '../components/PasswordFieldComponent';
import NameFieldComponent from '../components/NameFieldComponent';
import CreateAccountComponent from '../components/CreateAccountComponent';

function SignupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LetsMeet</Text>
      <Text style={styles.text}>Create Your Account</Text>
      <TextInput // display name field
        style={styles.textField}
        label="DisplayName"
      />
      <TextInput // username field
        style={styles.textField}
        label="Username"
      />
      <TextInput // email field
        style={styles.textField}
        label="Email"
        autoCompeleteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        // onChange={handleChangeText}
      />
      <TextInput // password field
        style={styles.textField}
        label="Password"
        secureTextEntry
        autoCorrect={false}
      />
      <TextInput // confirm password field
        style={styles.textField}
        label="Confirm Password"
        secureTextEntry
        autoCorrect={false}
      />
      <Button // create account button
        // onPress={handleButtonPress}
        style={styles.button}
        mode="contained"
      >
        Create Account
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
  },
  textField: {
    marginVertical: 15,
    width: '90%',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 15,
  },
});

export default SignupScreen;
