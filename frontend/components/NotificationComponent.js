import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Button, Divider, Text} from 'react-native-paper';

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

// Styles
const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    marginTop: 12
  },

  notification_avatar: {
    marginHorizontal: 12
  },

  button: {
    width: 100,
    marginEnd: 40,
    marginVertical: 12
  },

  button_positive: {
  },

  button_negative: {
    backgroundColor: 'grey'
  },

  buttons_view: {
    flexDirection: 'row'
  }
});

export default NotificationComponent;
