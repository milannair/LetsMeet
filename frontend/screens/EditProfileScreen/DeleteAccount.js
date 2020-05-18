import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Text, TextInput, Button, Dialog, Portal, HelperText,
} from 'react-native-paper';

function DeleteAccountDialog({
  isVisible,
  visibleCallback,
  deleteCallback,
  showHelperText,
}) {
  const [password, setPassword] = useState('');

  return (
    <View>
      <Portal>
        <Dialog
          visible={isVisible}
          onDismiss={() => visibleCallback()}
        >
          <Dialog.Title>Delete Account</Dialog.Title>
          <Dialog.Content>
            <Text>Please confirm your password to delete your account</Text>
            <TextInput
              mode="outlined"
              label="Current Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </Dialog.Content>
          <HelperText
            type="error"
            visible={showHelperText}
          >
            Password is incorrect
          </HelperText>
          <Dialog.Actions>
            <Button onPress={() => visibleCallback()}>Cancel</Button>
            <Button onPress={() => deleteCallback(password)}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

export default DeleteAccountDialog;
