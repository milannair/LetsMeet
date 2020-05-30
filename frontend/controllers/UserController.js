import { url } from '../api-routes';
const axios = require("axios").default;

export async function postUser(username, email, phone, password, displayName) {
  try {
    const response = await axios.post(url + '/users', {
        username: username,
        email: email,
        phone: phone,
        password: password,
        displayName: displayName,
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getUser(id) {
  let responseData = {};
  try {
    responseData = (
      await axios.get(protocol + baseUrl + ":" + port + route + "/user/" + id)
    ).data;
    if (responseData.status === 200) {
      return responseData.data;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function deleteUser(id) {
  let responseData = {};
  try {
    responseData = (
      await axios.delete(
        protocol + baseUrl + ":" + port + route + "/user/" + id
      )
    ).data;
    if (responseData.status === 200) {
      return responseData.data;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}
export async function updateUser(id) {
  let responseData = {};
  try {
    responseData = (
      await axios.patch(
        protocol + baseUrl + ":" + port + route + "/user/" + id
        //ADD JSON BODY
      )
    ).data;
    if (responseData.status === 200) {
      return responseData.data;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function loginUser(credential, password) {
  let responseData = {};
  try {
    responseData = (
      await axios.get(protocol + baseUrl + ":" + port + route + "/user/login", {
        cred: credential,
        password: password,
      })
    ).data;
    if (responseData.status === 200) {
      return responseData.data;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function userGroups(id) {
  let responseData = {};
  try {
    responseData = (
      await axios.get(
        protocol + baseUrl + ":" + port + route + "/user/group/" + id
      )
    ).data;
    if (responseData.status === 200) {
      return responseData.data;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function getUserByUsername(username) {
  let responseData = {};
  try {
    responseData = (
      await axios.get(
        protocol + baseUrl + ":" + port + route + "/user/byUserName/" + username
      )
    ).data;
    if (responseData.status === 200) {
      return responseData.data;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function addGroupRequest(userId, groupId) {
  let responseData = {};
  try {
    responseData = (
      await axios.post(
        protocol +
          baseUrl +
          ":" +
          port +
          route +
          "/user/addGroupRequest/" +
          userId +
          "/" +
          groupId
      )
    ).data;
    if (responseData.status === 200) {
      return responseData.data;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function removeGroupRequest(userId, groupId) {
  let responseData = {};
  try {
    responseData = (
      await axios.post(
        protocol +
          baseUrl +
          ":" +
          port +
          route +
          "/user/removeGroupRequest/" +
          userId +
          "/" +
          groupId
      )
    ).data;
    if (responseData.status === 200) {
      return responseData.data;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function addGroup(userId, groupId) {
  let responseData = {};
  try {
    responseData = (
      await axios.post(
        protocol +
          baseUrl +
          ":" +
          port +
          route +
          "/user/addGroup/" +
          userId +
          "/" +
          groupId
      )
    ).data;
    if (responseData.status === 200) {
      return responseData.data;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function removeGroup(userId, groupId) {
  let responseData = {};
  try {
    responseData = (
      await axios.post(
        protocol +
          baseUrl +
          ":" +
          port +
          route +
          "/user/addGroup/" +
          userId +
          "/" +
          groupId
      )
    ).data;
    if (responseData.status === 200) {
      return responseData.data;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function userMeetings(userId) {
  let responseData = {};
  try {
    responseData = (
      await axios.post(
        protocol + baseUrl + ":" + port + route + "/user/meetings/" + userId
      )
    ).data;
    if (responseData.status === 200) {
      return responseData.data;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function addMeeting(userId, meetingId) {
  let responseData = {};
  try {
    responseData = (
      await axios.post(
        protocol +
          baseUrl +
          ":" +
          port +
          route +
          "/user/addMeeting/" +
          userId +
          "/" +
          meetingId
      )
    ).data;
    if (responseData.status === 200) {
      return responseData.data;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function removeMeeting(userId, meetingId) {
  let responseData = {};
  try {
    responseData = (
      await axios.post(
        protocol +
          baseUrl +
          ":" +
          port +
          route +
          "/user/removeMeeting/" +
          userId +
          "/" +
          meetingId
      )
    ).data;
    if (responseData.status === 200) {
      return responseData.data;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function getUserSchedule(userId) {
  try {
    const response = await axios.get(url + '/user/schedule/' + userId);
    if (response && response.data && response.status === 200) {
      return response.data.data;
    } else {
      console.error('Error retrieving user schedule'); 
    }
  } catch (error) {
    console.error(error);
  }
}

export async function setUserSchedule(userId, schedule) {
  try {
    const response = await axios.post(url + '/user/setSchedule', {
      userId: userId,
      schedule: schedule
    });
    if (response.status === 200) {
      return response;
    } else {
      console.error("Error setting user schedule");
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function getUserIdentifiers(id) {
  try {
    const response = (await axios.get(url + '/user/identifiers/' + id)).data;
    if(response.status === 200) {
      return response.data
    } else {
      console.log(response);
    }
    
  } catch (error) {
    console.error('Error: ' +error);
  }
}
