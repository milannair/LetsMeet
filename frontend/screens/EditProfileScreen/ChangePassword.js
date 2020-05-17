import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {
  Text, TextInput, Button, Dialog, Portal,
} from 'react-native-paper';
import styles from './styles';

function ChangePasswordDialog(isVisible) {
  const [visible, setVisible] = useState(isVisible);

  // useEffect(() => {
  //   setVisible(true);
  // }, []);

  return (
    <View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}
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
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button onPress={() => setVisible(false)}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

export default ChangePasswordDialog;
