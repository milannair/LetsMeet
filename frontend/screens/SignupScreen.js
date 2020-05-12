import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
// import EmailFieldComponent from '../components/EmailFieldComponent';
// import PasswordFieldComponent from '../components/PasswordFieldComponent';
// import NameFieldComponent from '../components/NameFieldComponent';
// import CreateAccountComponent from '../components/CreateAccountComponent';
//todo: put this in a folder called SignupScreen, rename to index.js, put stylesheet in style.js


function SignupScreen() {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const DISPLAY_NAME = 0;
  const USERNAME = 1;
  const EMAIL = 2;
  const PASS = 3;
  const CONFIRM_PASS = 4;

  const handleChangeText = (e, fieldType) => {
    if (fieldType === DISPLAY_NAME) {
      setDisplayName(e.nativeEvent.text);
    } else if (fieldType === USERNAME) {
      setUsername(e.nativeEvent.text);
    } else if (fieldType === EMAIL) {
      setEmail(e.nativeEvent.text);
    } else if (fieldType === PASS) {
      setPassword(e.nativeEvent.text);
    } else if (fieldType === CONFIRM_PASS) {
      setConfirmPassword(e.nativeEvent.text);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>LetsMeet</Text>
      <Text style={styles.text}>Create Your Account</Text>
      <TextInput // display name field
        style={styles.textField}
        label="DisplayName"
        value={displayName}
        onChange={(e) => handleChangeText(e, DISPLAY_NAME)}
      />
      <TextInput // username field
        style={styles.textField}
        label="Username"
        value={username}
        onChange={(e) => handleChangeText(e, USERNAME)}
      />
      <TextInput // email field
        style={styles.textField}
        label="Email"
        autoCompeleteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={email}
        onChange={(e) => handleChangeText(e, EMAIL)}
      />
      <TextInput // password field
        style={styles.textField}
        label="Password"
        secureTextEntry
        autoCorrect={false}
        value={password}
        onChange={(e) => handleChangeText(e, PASS)}
      />
      <TextInput // confirm password field
        style={styles.textField}
        label="Confirm Password"
        secureTextEntry
        autoCorrect={false}
        value={confirmPassword}
        onChange={(e) => handleChangeText(e, CONFIRM_PASS)}
      />
      <Button // create account button
        onPress={() => Alert.alert('pressed')}
        style={styles.button}
        mode="contained"
        disabled={email.length === 0}
        contentStyle={styles.buttonDims}
        uppercase={false}
      >
        <Text style={styles.buttonText}>
          Create Account
        </Text>
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
  },
  button: {
    justifyContent: 'center',
    marginVertical: 15,
    width: '90%',
    height: 64,
  },
  buttonText: {
    fontSize: 25,
  },
});

export default SignupScreen;
