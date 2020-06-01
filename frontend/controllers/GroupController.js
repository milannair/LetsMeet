import { url } from '../api-routes';
const axios = require('axios').default;

export async function getUserGroups(userId) {
  let groups = [];
  try {
    const response = await getUserGroupIds(userId);
    for (let i = 0; i < response.length; i++) {
      const newResponse = (await axios.get(url + "/group/name/" + response[i]))
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
    const response = (await axios.get(url + "/group/" + groupId)).data;
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function createUserGroup(owner, name, memberRequests) {
  let response = await createGroup(owner, name, memberRequests);
  if (response.status === 200) {
    const groupId = response.data._id;
    response = await addUserGroup(owner, groupId);
    for (let i = 0; i < memberRequests.length; i++) {
      await addUserGroupRequest(memberRequests[i], groupId);
    }
  }
}

// Helper Functions

async function getUserGroupIds(userId) {
  let response = {};
  try {
    response = await axios.get(url + "/user/group/" + userId);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
  return response;
}

async function createGroup(owner, name, memberRequests) {
  try {
    const response = await axios.post(url + "/group", {
      meeetingRequests: [],
      memberRequests: memberRequests,
      members: owner,
      owner: owner,
      name: name,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function addUserGroup(userId, groupId) {
  try {
    const response = await axios.post(url + "/user/addGroup/", {
      userId: userId,
      groupId: groupId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function addUserGroupRequest(userId, groupId) {
  try {
    const response = await axios.post(url + "/user/addGroupRequest", {
      userId: userId,
      groupId: groupId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
