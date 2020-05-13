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
    const showUser = () => {
      getUser('5ebb7d22d5352752400c7cfe')
        .then((response) => {
          setUser(response);
          console.log(user);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    showUser();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{user}</Text>
    </View>
  );
}

export default Profile;
