import React from 'react';
import { Portal, Dialog, Paragraph, Button } from 'react-native-paper';
import moment from 'moment';

function RemoveTimeSlotDialog({ visible, day, start, end, onDismiss, onConfirm }) {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
      >
        <Dialog.Title>Confirm Remove Time Slot</Dialog.Title> 
        <Dialog.Content>
          <Paragraph>
            {day}, {moment(start).format('LT')} to {moment(end).format('LT')}
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={onConfirm}>Confirm</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default RemoveTimeSlotDialog;