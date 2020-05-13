import React, { useState } from 'react';
import {
  Text,
  View,
} from 'react-native';
import {
  TextInput, Button, HelperText,
} from 'react-native-paper';
import styles from './styles';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const maxFieldLength = 25;
  const minFieldLength = 3;

  const handleButtonPress = () => {
    let flag = false;
    if (password.length < 6) {
      setShowPasswordError(true);
      flag = true;
    } else {
      setShowPasswordError(false);
    }

    if (!flag) {
      console.log('sending account to database');
      setLoadingIcon(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>LetsMeet</Text>
      <HelperText
        type="error"
        visible={false}
      >
        Error Message
      </HelperText>
      <TextInput // email field
        style={styles.textField}
        label="Email"
        autoCompeleteType="email"
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
          onPress={() => handleButtonPress()}
          style={styles.button}
          mode="contained"
          disabled={!(email && password)}
          uppercase={false}
          loading={loadingIcon}
        >
          <Text style={styles.buttonText}>
            Login
          </Text>
        </Button>
        <Button // create account button
          onPress={() => handleButtonPress()}
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
