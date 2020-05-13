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
function NotificationComponent(props) {
  return (
    <View style={styles.view}>
      {/* Avatar */}
      {/* TODO: might want to change the avatar to a meaningful one */}
      <Avatar.Text size={40} label={"i"}
                   style={styles.notification_avatar} />

      {/* Message and buttons */}
      <View>
        <Text>{props.text}</Text>
        <View style={styles.buttons_view}>
          <Button
            onPress={props.positiveAction}
            mode='contained'
            style={[styles.button, styles.button_positive]}
          >
            Accept
          </Button>
          <Button
            onPress={props.negativeAction}
            mode='contained'
            style={[styles.button, styles.button_negative]}
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
