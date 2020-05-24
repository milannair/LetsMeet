import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {
  List, Text, Appbar, Divider, FAB,
} from 'react-native-paper';
import styles from './styles';
import { getUser } from '../../controllers/UserController';
import * as Screen from '../../navigation/tab_navigator/stacks/profile/screen-names';

function Profile({ navigation }) {
  const [user, setUser] = useState(JSON.parse('{"username" : "", "email" : "", "displayName" : ""}'));

  useEffect(() => {
    const showUser = async () => {
      try {
        const user = await getUser('5ec078fdb5169a2a249e2d94');
        console.log(user);
        if (user !== undefined) {
          setUser(user);
        } else {
          console.error('user not found');
        }
      } catch (error) {
        console.error(error);
      }
    };
    showUser();
  }, []);

  const handleSettingsPress = () => {
    console.log('settings pressed');
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
        <Appbar.Action icon="dots-vertical" onPress={() => handleSettingsPress} color="#f9f9f9" />
      </Appbar.Header>
      <List.Item
        title={user.displayName}
        description={user.email}
        left={() => <List.Icon icon="account-circle" />}
        right={() => <Text>Tap to edit</Text>}
        onPress={() => navigation.navigate(Screen.EDIT_PROFILE)}
      />
      <Divider />
      <Text style={styles.text}>Available Times</Text>
      <FAB
        style={styles.fab}
        icon="pencil"
        onPress={() => { console.log('navigate to edit schedule'); }}
      />
    </View>
  );
}

export default Profile;
