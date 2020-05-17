import React, { useState } from 'react';
import { Text, View, Alert } from 'react-native';
import {
  TextInput, Button, HelperText, IconButton,
} from 'react-native-paper';
import styles from './styles';
import { postUser } from '../../controllers/UserController';

const LOGIN_SCREEN_NAME = 'Login';

function Signup({ navigation }) {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmPassError, setShowConfirmPassError] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [showDisplayNameError, setDisplayNameError] = useState(false);
  const [showUsernameError, setUsernameError] = useState(false);
  const maxFieldLength = 25;
  const minFieldLength = 3;

  const handleSignupButtonPress = () => {
    let flag = false;
    if (password !== confirmPassword) {
      setShowConfirmPassError(true);
      flag = true;
    } else {
      setShowConfirmPassError(false);
    }

    if (password.length < 6) {
      setShowPasswordError(true);
      flag = true;
    } else {
      setShowPasswordError(false);
    }

    if (displayName.length < minFieldLength) {
      setDisplayNameError(true);
      flag = true;
    } else {
      setDisplayNameError(false);
    }

    if (username.length < minFieldLength) {
      setUsernameError(true);
      flag = true;
    } else {
      setUsernameError(false);
    }

    if (!flag) {
      console.log('sending account to database');
      setLoadingIcon(true);
      postUser(username, email, phone, password, displayName)
        .then((response) => {
          console.log(response);
          if (response.status >= 200 && response.status < 300) {
            console.log('account created');
            navigation.navigate('Tabs');
          } else {
            // TODO: some error message on UI
            Alert.alert('Failed to create account. Please try again.');
          }
        })
        .catch((error) => {
          console.error(error);
          Alert.alert('Failed to create account. Please try again.');
          // TODO: some error message on UI
        })
    }
  };

  const handleBackButtonPress = () => {
    navigation.navigate(LOGIN_SCREEN_NAME);
  };

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
        visible={false}
      >
        Error Message
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
        visible={showDisplayNameError}
      >
        Display Name must be at least {minFieldLength} characters long
      </HelperText>
      <TextInput // username field
        style={styles.textField}
        mode='outlined'
        label="Username"
        autoCompleteType="username"
        value={username}
        onChange={(e) => setUsername(e.nativeEvent.text)}
        maxLength={maxFieldLength}
      />
      <HelperText
        type="error"
        visible={showUsernameError}
      >
        Username must be at least {minFieldLength} characters long
      </HelperText>
      <TextInput // email field
        style={styles.textField}
        mode='outlined'
        label="Email"
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={email}
        onChange={(e) => setEmail(e.nativeEvent.text)}
        maxLength={256}
      />
      <HelperText
        type="error"
        visible={false}
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
        onChange={(e) => setPhone(e.nativeEvent.text)}
        maxLength={maxFieldLength}
      />
      <HelperText
        type="error"
        visible={false}
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
        onChange={(e) => setPassword(e.nativeEvent.text)}
        maxLength={maxFieldLength}
      />
      <HelperText
        type="error"
        visible={showPasswordError}
      >
        Password must be at least 6 characters long
      </HelperText>
      <TextInput // confirm password field
        style={styles.textField}
        mode='outlined'
        label="Confirm Password"
        secureTextEntry
        autoCorrect={false}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
        maxLength={maxFieldLength}
      />
      <HelperText
        type="error"
        visible={showConfirmPassError}
      >
        Passwords do not match
      </HelperText>
      <Button // create account button
        onPress={() => handleSignupButtonPress()}
        style={styles.button}
        mode="contained"
        disabled={!(displayName && username && email && password && confirmPassword && phone)}
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
