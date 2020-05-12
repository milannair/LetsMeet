import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import styles from './styles';

function index() {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmPassError, setShowConfirmPassError] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [showDisplayNameError, setDisplayNameError] = useState(false);
  const [showUsernameError, setUsernameError] = useState(false);
  const maxFieldLength = 15;
  const minFieldLength = 5;

  const handleButtonPress = () => {
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
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>LetsMeet</Text>
      <Text style={styles.text}>Create Your Account</Text>
      <HelperText
        type="error"
        visible={false}
      >
        Error message
      </HelperText>
      <TextInput // display name field
        style={styles.textField}
        label="DisplayName"
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
        label="Email"
        autoCompeleteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={email}
        onChange={(e) => setEmail(e.nativeEvent.text)}
        maxLength={maxFieldLength}
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
      <TextInput // confirm password field
        style={styles.textField}
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
        onPress={() => handleButtonPress()}
        style={styles.button}
        mode="contained"
        disabled={!(displayName && username && email && password && confirmPassword)}
        contentStyle={styles.buttonDims}
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

export default index;
