import React, { useState } from 'react';
import { Text, View, Alert, AsyncStorage } from 'react-native';
import {
  TextInput, Button, HelperText, IconButton,
} from 'react-native-paper';
import styles from './styles';
import { postUser } from '../../controllers/UserController';
import useSocket from '../../hooks/UseSocket/index';

const LOGIN_SCREEN_NAME = 'Login';

function Signup({ navigation }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingIcon, setLoadingIcon] = useState(false);
  const maxFieldLength = 25;
  const minFieldLength = 3;
  const [userNameValid, setUsernameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [passwordValid, setPasswordVaild] = useState(true);
  const [passwordsMatch, setPasswordsMatch] =useState(true);

  const { sendData } = useSocket('user authenticated', null);

  const handleSignupButtonPress = () => {
    console.log('sending account to database');
    setLoadingIcon(true);
    postUser(username, email, phone, password, displayName)
      .then(async (response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log('account created');
          sendData(await AsyncStorage.getItem('userId'));
          navigation.navigate('Tabs');
        } else {
          setErrorMessage(response.data.errorMessage ? response.data.errorMessage : response.data);
          setLoadingIcon(false);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const handleBackButtonPress = () => {
    navigation.navigate(LOGIN_SCREEN_NAME);
  };

  const validateUsername = (username) => {
    username.indexOf(" ") > 0 ? setUsernameValid(false) : setUsernameValid(true);
  }

  const validateEmail = (email) => {
    email.indexOf("@") < 0 ? setEmailValid(false) : setEmailValid(true);
  }

  const validatePhoneNo = (phone) => {
    phone.length !== 10 ? setPhoneValid(false) : setPhoneValid(true);
  }

  const validatePassword = (password) => {
    password.length < 6 ? setPasswordVaild(false): setPasswordVaild(true);
  }
  
  const validatePasswordsMatch = (pass) => {
    pass !== password ? setPasswordsMatch(false): setPasswordsMatch(true);
  }

  return (
    <View style={styles.container}>
      <IconButton // goes back to login screen
        icon="arrow-left"
        size={25}
        style={styles.backButton}
        onPress={() => handleBackButtonPress()}
      />
      <Text style={styles.text}>LetsMeet</Text>
      <Text style={styles.text}>Create Your Account</Text>
      <HelperText
        type="error"
        visible={errorMessage}
      >
        {errorMessage}
      </HelperText>
      <TextInput // display name field
        style={styles.textField}
        mode='outlined'
        label="Display Name"
        autoCompleteType="name"
        value={displayName}
        onChange={(e) => setDisplayName(e.nativeEvent.text)}
        maxLength={maxFieldLength}
      />
      <HelperText
        type="error"
        visible={false}
      >
        Display Name must be at least {minFieldLength} characters long
      </HelperText>
      <TextInput // username field
        style={styles.textField}
        mode='outlined'
        label="Username"
        autoCompleteType="username"
        value={username}
        onChange={(e) => {setUsername(e.nativeEvent.text); validateUsername(e.nativeEvent.text)}}
        maxLength={maxFieldLength}
      />
      <HelperText
        type="error"
        visible={!userNameValid}
      >
        Username cannot have any spaces
      </HelperText>
      <TextInput // email field
        style={styles.textField}
        mode='outlined'
        label="Email"
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={email}
        onChange={(e) => {setEmail(e.nativeEvent.text); validateEmail(e.nativeEvent.text)}}
        maxLength={256}
      />
      <HelperText
        type="error"
        visible={!emailValid}
      >
        Email is invalid
      </HelperText>
      <TextInput // phone field
        style={styles.textField}
        mode='outlined'
        label="Phone Number"
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        value={phone}
        onChange={(e) => {setPhone(e.nativeEvent.text); validatePhoneNo(e.nativeEvent.text)}}
        maxLength={maxFieldLength}
      />
      <HelperText
        type="error"
        visible={!phoneValid}
      >
        Phone Number is invalid
      </HelperText>
      <TextInput // password field
        style={styles.textField}
        mode='outlined'
        label="Password"
        secureTextEntry
        autoCorrect={false}
        value={password}
        onChange={(e) => {setPassword(e.nativeEvent.text); validatePassword(e.nativeEvent.text)}}
        maxLength={maxFieldLength}
      />
      <HelperText
        type="error"
        visible={!passwordValid}
      >
        Password must be at least 6 characters long
      </HelperText>
      {passwordValid && password.length > 0 && <TextInput // confirm password field
        style={styles.textField}
        mode='outlined'
        label="Confirm Password"
        secureTextEntry
        autoCorrect={false}
        value={confirmPassword}
        onChange={(e) => {setConfirmPassword(e.nativeEvent.text), validatePasswordsMatch(e.nativeEvent.text)}}
        maxLength={maxFieldLength}
      />}
      {passwordValid && password.length > 0 && <HelperText
        type="error"
        visible={!passwordsMatch}
      >
        Passwords do not match
      </HelperText>}
      <Button // create account button
        onPress={() => handleSignupButtonPress()}
        style={styles.button}
        mode="contained"
        disabled={!(displayName && username && email && password && 
          confirmPassword && phone && userNameValid && emailValid && phoneValid
          && passwordValid && passwordsMatch)}
        uppercase={false}
        loading={loadingIcon}
      >
        <Text style={styles.buttonText}>
          Create Account
        </Text>
      </Button>
    </View>
  );
}

export default Signup;
