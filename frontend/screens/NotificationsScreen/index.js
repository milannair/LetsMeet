import React from 'react';
import {View} from 'react-native';
import NotificationComponent from "../../components/NotificationComponent/index";
import AppbarComponent from "../../components/AppbarComponent";

/*
 * TODO: determine a notification's model
 *  For now, a notification is represented only by the message,
 *  and no meaningful button action is defined
 */

/*
 * Route parameters:
 * - notifications: the array of notification messages
 */
function NotificationsScreen({route, navigation}) {
  const { notifications } = route.params;

  let components = [];

  for (let i = 0; i < notifications.length; i++) {
    components.push(
      <NotificationComponent
        text={notifications[i]}
        positiveAction={() => console.log("+")}
        negativeAction={() => console.log("-")}
      />
    )
  }

  return (
      <View>
        <AppbarComponent />
        {components}
      </View>
  );
}

export default NotificationsScreen;
