import React from 'react';
import {View} from 'react-native';
import NotificationComponent from "../../components/NotificationComponent/index";

/*
 * TODO: determine a notification's model
 *  For now, a notification is represented only by the message,
 *  and no meaningful button action is defined
 */

/*
 * Props:
 * - notifications: the array of notification messages
 */
function NotificationsScreen(props) {
  let components = [];

  for (let i = 0; i < props.notifications.length; i++) {
    components.push(
      <NotificationComponent
        text={props.notifications[i]}
        positiveAction={() => console.log("+")}
        negativeAction={() => console.log("-")}
      />
    )
  }

  return (
      <View>
        {components}
      </View>
  );
}

export default NotificationsScreen;
