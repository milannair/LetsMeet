import { url } from '../api-routes';
import {addGroup, addGroupRequest, userGroups} from './UserController';
const axios = require('axios').default;
import { AsyncStorage } from "react-native";

export async function getUserGroups(userId) {
  let groups = [];
  let response = [];
  try {
    let token = await AsyncStorage.getItem('token');
    response = await userGroups(await userId);
    response = response.data.data;
    for (let i = 0; i < response.length; i++) {
      const newResponse = (await axios.get(url + "/group/name/" + response[i] + "&" + token))
        .data;
      if (newResponse.status === 200) {
        groups.push(newResponse.data);
      } else {
        console.log(newResponse);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return groups;
}

export async function getGroupData(groupId) {
  try {
    let token = await AsyncStorage.getItem('token');
    const response = (await axios.get(url + "/group/" + groupId + "&" + token)).data;
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function createUserGroup(owner, name, memberRequests) {
  let response = (await createGroup(owner, name, memberRequests)).data;
  if (response.status === 200) {
    const groupId = response.data._id;
    response = await addGroup(owner, groupId);
    for (let i = 0; i < memberRequests.length; i++) {
      await addGroupRequest(memberRequests[i], groupId);
    }
  }
}

export async function removeUserFromGroup(groupId, userId) {
  try {
    let token = await AsyncStorage.getItem('token');
    const response = (await axios.post(url + "/group/removeMember/" + groupId + "&" + userId + "&" + token));
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
}

// Helper Functions

async function createGroup(owner, name, memberRequests) {
  try {
    let token = await AsyncStorage.getItem('token');
    const response = await axios.post(url + "/groups/" + token, {
      meeetingRequests: [],
      memberRequests: memberRequests,
      members: owner,
      owner: owner,
      name: name,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
