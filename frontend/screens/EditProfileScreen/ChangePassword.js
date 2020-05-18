import React, { useState } from 'react';
import { View } from 'react-native';
import {
  TextInput, Button, Dialog, Portal, HelperText,
} from 'react-native-paper';

function ChangePasswordDialog({
  isVisible,
  visibleCallback,
  changeCallback,
  showHelperText1,
  showHelperText2,
}) {
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  return (
    <View>
      <Portal>
        <Dialog
          visible={isVisible}
          onDismiss={() => visibleCallback()}
        >
          <Dialog.Title>Change Password</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label="Current Password"
              secureTextEntry
              value={currPassword}
              onChangeText={(text) => setCurrPassword(text)}
            />
            <HelperText
              type="error"
              visible={showHelperText1}
            >
              Password is incorrect
            </HelperText>
            <TextInput
              mode="outlined"
              label="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
            <HelperText
              type="error"
              visible={showHelperText2}
            >
              Password must be at least 6 characters long
            </HelperText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => visibleCallback()}>Cancel</Button>
            <Button onPress={() => changeCallback(currPassword, newPassword)}>
              Confirm
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

export default ChangePasswordDialog;
