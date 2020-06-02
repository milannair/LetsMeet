import { url } from '../api-routes';
const axios = require('axios').default;
import GroupInvitation from "../models/GroupInvitation";
import { AsyncStorage } from "react-native";

/*
 * Returns the array of pending group invitations for a user represented by
 * 'GroupInvitation' objects, or 'null' if an error occurred.
 */
export async function getUserGroupInvitations(userId) {
  let invitations = [];
  try {
    const groupIds = await getGroupRequests(userId);
    console.log("in usergroup invitations");
    console.log(groupIds);
    console.log("userid" + userId);
    for (const groupId of groupIds) {
      console.log("groupid" + groupId);
      const groupName = await getGroupName(groupId);
      invitations.push(new GroupInvitation(groupId, groupName));
    }
    return invitations;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/*
 * Accept a pending group invitation for a user. Returns server's response for
 * the accept action, or 'null' if an error occurred.
 */
export async function acceptGroupInvitation(userId, groupId) {
  try {
    await addUserToGroup(userId, groupId);
    return await removeGroupRequest(userId, groupId);
  } catch (error) {
    console.log(error);
    return null;
  }
}

/*
 * Decline a pending group invitation for a user. Returns server's response for
 * the decline action, or 'null'  if an error occurred.
 */
export async function declineGroupInvitation(userId, groupId) {
  try {
    return await removeGroupRequest(userId, groupId);
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Helper Functions

/*
 * Returns the array of IDs for the groups that the user has been invited to
 * join. An exception will be thrown if an error occurred.
 */
async function getGroupRequests(userId) {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.get(`${url}/user/${userId}&` + token);
  if (response.status === 200) {
    return response.data.requests;
  } else {
    throw response;
  }
}

/*
 * Returns the name of the group with the specified group ID. An exception will
 * be thrown if an error occurred.
 */
async function getGroupName(groupId) {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.get(`${url}/group/name/${groupId}&` + token);
  if (response.status === 200) {
    console.log(response.data);
    return response.data.data.name; // TODO: change this if API code is touched
  } else {
    throw response;
  }
}

/*
 * Adds a user to a group. An exception will be thrown if an error occurred.
 */
async function addUserToGroup(userId, groupId) {
  const token = await AsyncStorage.getItem('token');
  const userResponse = await axios.post(
    `${url}/user/addGroup/${userId}&${groupId}&` + token);
  if (userResponse.status !== 200) {
    throw userResponse;
  }
  const groupResponse = await axios.post(
    `${url}/group/addMember/` + token,
    {
    userId: userId,
    groupId: groupId,
  });
  if (groupResponse.status !== 200) {
    throw groupResponse;
  }
}

/*
 * Removes a group invitation for a user, and returns the server's response.
 * An exception will be thrown if an error occurred.
 */
async function removeGroupRequest(userId, groupId) {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.post(
    `${url}/user/removeGroupRequest/${userId}&${groupId}&` + token);
  if (response.status === 200) {
    return response.data;
  } else {
    throw response;
  }
}
