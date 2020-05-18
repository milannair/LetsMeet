import React, { useState, useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import {
  TextInput, Button, HelperText, IconButton,
} from 'react-native-paper';
import styles from './styles';
import { getUser } from '../../controllers/ReferenceController';

function Profile({ navigation }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const showUser = async () => {
      try {
        const user = await getUser('5eab42ff0da6924cccfefe38');
        console.log(user);
        setUser(user);
      } catch (error) {
        console.error(error);
      }
      
    };
    showUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{JSON.stringify(user)}</Text>
    </View>
  );
}

export default Profile;
