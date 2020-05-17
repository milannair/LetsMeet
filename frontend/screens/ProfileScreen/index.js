import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import {
  List, Text, Appbar, Menu,
} from 'react-native-paper';
import styles from './styles';
import { getUser } from '../../controllers/UserController';
import * as Screen from '../../navigation/tab_navigator/stacks/profile/screen-names';

function Profile({ navigation }) {
  const [user, setUser] = useState(JSON.parse('{"username" : "", "email" : "", "displayName" : ""}'));

  useEffect(() => {
    const showUser = async () => {
      try {
        // nelson's test user: 5ebb8c9ad5352752400c7d02
        // Brandon's test user: 5eab42ff0da6924cccfefe38
        const user = await getUser('5ebb8c9ad5352752400c7d02');
        console.log(user);
        setUser(user);
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
    <View>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
        <Appbar.Action icon="bell" onPress={() => console.log('Pressed notifications')} />
        <Appbar.Action icon="dots-vertical" onPress={() => handleSettingsPress} />
      </Appbar.Header>
      <List.Item
        title={user.displayName}
        description={user.email}
        left={() => <List.Icon icon="account-circle" />}
        right={() => <Text>Tap to edit</Text>}
        onPress={() => navigation.navigate(Screen.EDIT_PROFILE)}
      />
      <Text style={styles.text}>Available Times</Text>
    </View>
  );
}

export default Profile;
