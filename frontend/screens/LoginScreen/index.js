import React, { useState, useEffect } from 'react';
import {
  View, AsyncStorage,
} from 'react-native';
import {
  Text, TextInput, Button, HelperText,
} from 'react-native-paper';
import styles from './styles';
import useSocket from '../../hooks/UseSocket/index';
import {loginUser} from '../../controllers/UserController';

const SIGNUP_SCREEN_NAME = 'Signup';
const HOME_SCREEN_NAME = 'Tabs';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [loginLoadingIcon, setLoginLoadingIcon] = useState(false);
  const [loginErrorVisible, setLoginErrorVisible] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState('');
  const maxFieldLength = 25;
  const minFieldLength = 3;

  const { sendData } = useSocket('user authenticated', null);

  const handleLoginButtonPress = async () => {
    let flag = false;
    if (password.length < 6) {
      setShowPasswordError(true);
      flag = true;
    } else {
      setShowPasswordError(false);
    }

    if (!flag) {
      setLoginLoadingIcon(true);
    }
    // TODO: check username and password in database
    const response = await loginUser(email, password);
    if(response.status === 200) {
      sendData(await AsyncStorage.getItem('userId'));
      navigation.navigate(HOME_SCREEN_NAME);
    } else if (response.status === 400) {
      setLoginErrorText(response.data);
      setLoginErrorVisible(true);
      setLoginLoadingIcon(false);
    }
  };

  const handleSignupButtonPress = () => {
    navigation.navigate(SIGNUP_SCREEN_NAME);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>LetsMeet</Text>
      <HelperText
        type="error"
        visible={loginErrorVisible}
      >
        {loginErrorText}
      </HelperText>
      <TextInput // email field
        style={styles.textField}
        mode='outlined'
        label="Email or Username"
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
      <View style={styles.buttonContainer}>
        <Button // login button
          onPress={() => handleLoginButtonPress()}
          style={styles.button}
          mode="contained"
          disabled={!(email && password)}
          uppercase={false}
          loading={loginLoadingIcon}
        >
          <Text style={styles.buttonText}>
            Login
          </Text>
        </Button>
        <Button // create account button
          onPress={() => handleSignupButtonPress()}
          style={styles.button}
          mode="contained"
          uppercase={false}
          loading={loadingIcon}
        >
          <Text style={styles.buttonText}>
            Signup
          </Text>
        </Button>
      </View>
    </View>
  );
}

export default Login;
