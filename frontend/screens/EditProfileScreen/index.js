import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import {
  Text, Appbar, TextInput, Button, Portal, Dialog,
} from 'react-native-paper';
import styles from './styles';
import { getUser } from '../../controllers/UserController';
import * as Screen from '../../navigation/tab_navigator/stacks/profile/screen-names';
import ChangePasswordDialog from './ChangePassword';

function EditProfile({ navigation }) {
  const [user, setUser] = useState(JSON.parse('{"username" : "", "email" : "", "displayName" : ""}'));
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [visibleChangePassword, setVisibleChangePassword] = useState(false);
  const [visibleDeleteAccount, setVisibleDeleteAccount] = useState(false);

  useEffect(() => {
    const showUser = async () => {
      try {
        // nelson's test user: 5ebb8c9ad5352752400c7d02
        // Brandon's test user: 5eab42ff0da6924cccfefe38
        const user = await getUser('5ebb8c9ad5352752400c7d02');
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

  const handleChangePassword = () => {
    setVisibleChangePassword(true);
  };

  const handleDeleteAccount = () => {
    setVisibleDeleteAccount(true);
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate(Screen.PROFILE)} />
      </Appbar.Header>
      <TextInput
        style={styles.textInput}
        label="Display Name"
        value={displayName}
        onChangeText={(text) => setDisplayName(text)}
        onBlur={(text) => handleChangeDisplayName(text)}
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
        onPress={() => handleChangePassword()}
      >
        Change Password
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        color="#db0000"
        onPress={() => handleDeleteAccount()}
      >
        Delete Account
      </Button>
      <Portal>
        <Dialog
          visible={visibleChangePassword}
          onDismiss={() => setVisibleChangePassword(false)}
        >
          <Dialog.Title>Change Password</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label="Current Password"
            />
            <TextInput
              mode="outlined"
              label="New Password"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisibleChangePassword(false)}>Cancel</Button>
            <Button onPress={() => setVisibleChangePassword(false)}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog
          visible={visibleDeleteAccount}
          onDismiss={() => setVisibleDeleteAccount(false)}
        >
          <Dialog.Title>Delete Account</Dialog.Title>
          <Dialog.Content>
            <Text>Please confirm your password to delete your account</Text>
            <TextInput
              mode="outlined"
              label="Current Password"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisibleDeleteAccount(false)}>Cancel</Button>
            <Button onPress={() => setVisibleDeleteAccount(false)}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

export default EditProfile;
