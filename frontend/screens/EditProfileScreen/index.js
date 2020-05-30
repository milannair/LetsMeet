import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import {
  Appbar, TextInput, Button,
} from 'react-native-paper';
import styles from './styles';
import { getUser } from '../../controllers/UserController';
import * as Screen from '../../navigation/tab_navigator/stacks/profile/screen-names';
import ChangePasswordDialog from './ChangePassword';
import DeleteAccountDialog from './DeleteAccount';

function EditProfile({ navigation }) {
  const [user, setUser] = useState(JSON.parse('{"username" : "", "email" : "", "displayName" : "", "password": ""}'));
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [visibleChangePassword, setVisibleChangePassword] = useState(false);
  const [showCurrPasswordHelperText, setCurrPasswordHelperText] = useState(false);
  const [showNewPasswordHelperText, setNewPasswordHelperText] = useState(false);

  const [visibleDeleteAccount, setVisibleDeleteAccount] = useState(false);
  const [showDeleteHelperText, setShowDeleteHelperText] = useState(false);

  useEffect(() => {
    const showUser = async () => {
      try {
        const user = await getUser('5ec3099bb6bc594db0193c0c');
        console.log(user);
        setUser(user);
        setDisplayName(user.displayName);
        setUsername(user.username);
        setEmail(user.email);
      } catch (error) {
        console.error(error);
      }
    };
    showUser();
  }, []);

  const handleChangeDisplayName = (text) => {
    console.log('change display name');
  };

  const handleChangeUsername = (text) => {
    console.log('change username');
  };

  const handleChangeEmail = (text) => {
    console.log('change email');
  };

  const handleChangePassword = (currPassword, newPassword) => {
    let flag = false;
    if (currPassword !== user.password) { // 'password' is placeholder password
      setCurrPasswordHelperText(true);
      flag = true;
    } else {
      setCurrPasswordHelperText(false);
    }
    if (newPassword.length < 6) {
      setNewPasswordHelperText(true);
      flag = true;
    } else {
      setNewPasswordHelperText(false);
    }

    if (!flag) {
      setVisibleChangePassword(false);
      Alert.alert('changed password'); // this doesn't show up for some reason
      console.log('changed password'); // change password
    }
  };

  const handleDeleteAccount = (password) => {
    if (password === user.password) {
      setVisibleDeleteAccount(false);
      console.log('Account deleted');
      navigation.navigate('Login'); // navigate to login page
    } else {
      setShowDeleteHelperText(true);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate(Screen.PROFILE)} color="#f9f9f9" />
        <Appbar.Content title="Edit Profile" />
      </Appbar.Header>
      <TextInput
        style={styles.textInput}
        label="Display Name"
        value={displayName}
        onChangeText={(text) => setDisplayName(text)}
        onBlur={(text) => handleChangeDisplayName(text)}
        autoFocus={false}
      />
      <TextInput
        style={styles.textInput}
        label="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        onBlur={(text) => handleChangeUsername(text)}
      />
      <TextInput
        style={styles.textInput}
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        onBlur={(text) => handleChangeEmail(text)}
      />
      <Button
        style={styles.button}
        mode="contained"
        uppercase={false}
        onPress={() => setVisibleChangePassword(true)}
      >
        Change Password
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        color="#db0000"
        uppercase={false}
        onPress={() => setVisibleDeleteAccount(true)}
      >
        Delete Account
      </Button>
      <ChangePasswordDialog
        isVisible={visibleChangePassword}
        visibleCallback={() => setVisibleChangePassword(false)}
        changeCallback={(currPassword, newPassword) => handleChangePassword(currPassword, newPassword)}
        showHelperText1={showCurrPasswordHelperText}
        showHelperText2={showNewPasswordHelperText}
      />
      <DeleteAccountDialog
        isVisible={visibleDeleteAccount}
        visibleCallback={() => setVisibleDeleteAccount(false)}
        deleteCallback={(password) => handleDeleteAccount(password)}
        showHelperText={showDeleteHelperText}
      />
    </View>
  );
}

export default EditProfile;
