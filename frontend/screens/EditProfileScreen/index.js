import React, { useState, useEffect } from 'react';
import { View, Alert, AsyncStorage } from 'react-native';
import {
  Appbar, TextInput, Button,
} from 'react-native-paper';
import styles from './styles';
import { getUser, updateUser, deleteUser } from '../../controllers/UserController';
import * as Screen from '../../navigation/tab_navigator/stacks/profile/screen-names';
import ChangePasswordDialog from './ChangePassword';
import DeleteAccountDialog from './DeleteAccount';
import { useIsFocused } from '@react-navigation/native'

function EditProfile({ navigation }) {
  const [user, setUser] = useState(JSON.parse('{"username" : "", "email" : "", "displayName" : "", "password": ""}'));
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');

  const [visibleChangePassword, setVisibleChangePassword] = useState(false);
  const [showCurrPasswordHelperText, setCurrPasswordHelperText] = useState(false);
  const [showNewPasswordHelperText, setNewPasswordHelperText] = useState(false);

  const [visibleDeleteAccount, setVisibleDeleteAccount] = useState(false);
  const [showDeleteHelperText, setShowDeleteHelperText] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    const showUser = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        setUserId(userId);

        const user = await getUser(userId);
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
  }, [isFocused]);

  const handleChangeDisplayName = () => {
    updateUser(userId, username, email, displayName);
  };

  const handleChangeUsername = () => {
    updateUser(userId, username, email, displayName);
  };

  const handleChangeEmail = () => {
    updateUser(userId, username, email, displayName);
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
      deleteUser(userId);
      navigation.navigate('Login'); // navigate to login page
    } else {
      setShowDeleteHelperText(true);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header
        style = {{backgroundColor: "#663399"}}
      >
        <Appbar.BackAction onPress={() => navigation.navigate(Screen.PROFILE)} color="#f9f9f9" />
        <Appbar.Content title="Edit Profile" />
      </Appbar.Header>
      <TextInput
        style={styles.textInput}
        label="Display Name"
        value={displayName}
        onChangeText={(text) => setDisplayName(text)}
        onBlur={() => handleChangeDisplayName()}
        autoFocus={false}
      />
      <TextInput
        style={styles.textInput}
        label="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        onBlur={() => handleChangeUsername()}
      />
      <TextInput
        style={styles.textInput}
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        onBlur={() => handleChangeEmail()}
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
