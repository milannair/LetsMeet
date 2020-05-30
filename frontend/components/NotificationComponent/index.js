import React from 'react';
import {View} from 'react-native';
import {Avatar, Button, Divider, Text} from 'react-native-paper';
import styles from './styles';

/*
 * Props:
 * - text: the notification text
 * - positiveAction: the action to execute when the user makes a positive choice
 * - negativeAction: the action to execute when the user makes a negative choice
 */
function NotificationComponent({ text, positiveAction, negativeAction }) {
  return (
    <View style={styles.container}>
      {/* Avatar */}
      {/* TODO: might want to change the avatar to a meaningful one */}
      <Avatar.Text size={40} label={"i"}
                   style={styles.notificationAvatar} />

      {/* Message and buttons */}
      <View style={styles.bodyContainer}>
        <Text>{text}</Text>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={positiveAction}
            mode='contained'
            style={[styles.button, styles.buttonPositive]}
          >
            Accept
          </Button>
          <Button
            onPress={negativeAction}
            mode='contained'
            style={[styles.button, styles.buttonNegative]}
          >
            Decline
          </Button>
        </View>
        <Divider />
      </View>
    </View>
  );
}

export default NotificationComponent;
