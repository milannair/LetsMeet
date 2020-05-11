import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EmailFieldComponent from '../components/EmailFieldComponent';
import PasswordFieldComponent from '../components/PasswordFieldComponent';
import NameFieldComponent from '../components/NameFieldComponent';
import CreateAccountComponent from '../components/CreateAccountComponent';

function SignupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LetsMeet</Text>
      <Text style={styles.text}>Create Your Account</Text>
      <NameFieldComponent text="Display Name" />
      <NameFieldComponent text="Username" />
      <EmailFieldComponent />
      <PasswordFieldComponent text="Password" />
      <PasswordFieldComponent text="Confirm Password" />
      <CreateAccountComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    paddingTop: '10%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
  },
});

export default SignupScreen;
