import React, {useEffect, useState} from 'react';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {View, AsyncStorage} from 'react-native';
import {Text} from 'react-native-paper';

import NotificationComponent
  from '../../components/NotificationComponent/index';
import AppbarComponent from '../../components/AppbarComponent';
import {
  acceptGroupInvitation,
  declineGroupInvitation,
  getUserGroupInvitations
} from '../../controllers/GroupInvitationController';
import styles from './styles';

/*
 * Route parameters:
 * - invitationsSupplier: a function that returns the array of invitations to
 *   be displayed. If no argument is specified for this parameter, then
 *   invitations will be read from the controller.
 */
function NotificationsScreen({route, navigation}) {
  const [userId, setUserId] = useState(null);
  const [invitations, setInvitations] = useState(null);
  const [updateRequired, setUpdateRequired] = useState(true);

  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback( () => {
      setUpdateRequired(true);
      return () => {
      };
    }, [])
  );

  useEffect(() => {
    const getUserId = async () => {
      let id = await AsyncStorage.getItem('userId');
      if (!userId) {
        setUserId(id);
      }
      // Read invitations
      if (route.params) {
        const {invitationsSupplier} = route.params;
        if (invitationsSupplier) {
          // Get invitations from the custom supplier
          setInvitations(invitationsSupplier());
        } else {
          // Some parameters were given to this route,
          // but invitationsSupplier is not set
          // Get invitations from the controller
          setInvitations(await getUserGroupInvitations(id));
        }
      } else {
        // No parameters were given to this route at all
        // Get invitations from the controller
        setInvitations(await getUserGroupInvitations(id));
      }
      setUpdateRequired(false);
    };

    // Get user ID if it has not been acquired
    getUserId();
  }, [isFocused, updateRequired]);

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
      // Create NotificationComponent for each invitation
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
      <View style={styles.container}>
        <AppbarComponent />
        {components}
      </View>
  );
}

export default NotificationsScreen;
