import React, {useState, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {AsyncStorage} from 'react-native-web';
import NotificationComponent
  from "../../components/NotificationComponent/index";
import AppbarComponent from "../../components/AppbarComponent";
import {
  acceptGroupInvitation,
  declineGroupInvitation,
  getUserGroupInvitations
} from "../../controllers/GroupInvitationController";
import styles from "./styles";

/*
 * Route parameters:
 * - invitationsSupplier: a function that returns the array of invitations to
 *   be displayed. If no argument is specified for this parameter, then
 *   invitations will be read from the controller.
 */
function NotificationsScreen({route, navigation}) {
  const [userId, setUserId] = useState(null);
  const [invitations, setInvitations] = useState(null);
  const [updateRequired, setUpdateRequired] = useState(false);

  useFocusEffect(
    React.useCallback( () => {
      setUpdateRequired(true);
      return () => {
      };
    }, [])
  );

  useEffect(() => {
    const getUserId = async () => {
      setUserId(await AsyncStorage.getItem("userId"));
    };

    const getInvitationsFromController = async () => {
      if (updateRequired) {
        setInvitations(await getUserGroupInvitations(userId));
        setUpdateRequired(false);
      }
    };

    if (!userId) {
      getUserId();
    }

    if (route.params) {
      const {invitationsSupplier} = route.params;
      if (invitationsSupplier) {
        setInvitations(invitationsSupplier());
      } else {
        getInvitationsFromController();
      }
    } else {
      getInvitationsFromController();
    }
  });

  async function respondToInvitation(accepted, userId, groupId) {
    if (accepted) {
      await acceptGroupInvitation(userId, groupId);
    } else {
      await declineGroupInvitation(userId, groupId);
    }
    setUpdateRequired(true);
  }

  let components = [];
  if (invitations) {
    if (invitations.length === 0) {
      components.push(
        <Text key={0} style={styles.message}>No notifications</Text>
      );
    } else {
      for (const invitation of invitations) {
        components.push(
          <NotificationComponent
            key={invitation.groupId}
            text={`You have been invited to group ${invitation.groupName}.`}
            positiveAction={() =>
              respondToInvitation(true, userId, invitation.groupId)}
            negativeAction={() =>
              respondToInvitation(false, userId, invitation.groupId)}
          />
        );
      }
    }
  } else {
    components.push(
      <Text key={0} style={styles.message}>
        An error occurred when reading invitations
      </Text>
    );
  }

  return (
      <View>
        <AppbarComponent />
        {components}
      </View>
  );
}

export default NotificationsScreen;
