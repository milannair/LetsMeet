import { url } from "../api-routes";
const axios = require("axios").default;

export async function postUser(username, email, phone, password, displayName) {
  try {
    const response = await axios.post(url + "/user/create", {
      username: username,
      email: email,
      phone: phone,
      password: password,
      displayName: displayName,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getUser(id, token) {
  let responseData = {};
  try {
    responseData = await axios.get(url + "/user/" + id + "&" + token).data;
    if (responseData.status === 200) {
      return responseData.data;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function deleteUser(id, token) {
  let responseData = {};
  try {
    responseData = (await axios.delete(url + "/user/" + id + "&" + token)).data;
    if (responseData.status === 200) {
      return responseData.data;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}
export async function updateUser(id, token) {
  let responseData = {};
  try {
    responseData = (
      await axios.patch(
        url + "/user/" + id + "&" + token
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
      await axios.get(url + "/user/login", {
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
    responseData = (await axios.get(url + "/user/group/" + id)).data;
    if (responseData.status === 200) {
      return responseData.data;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function getUserByUsername(username) {
  console.log(username);
  let responseData = {};
  try {
    responseData = (await axios.get(url + "/user/byUserName/" + username)).data;
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
      await axios.post(url + "/user/addGroupRequest/" + userId + "&" + groupId)
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
    responseData = await axios.post(
      url + "/user/removeGroupRequest/" + userId + "&" + groupId
    );
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
      await axios.post(url + "/user/addGroup/" + userId + "&" + groupId)
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
    responseData = await axios.post(
      url + "/user/removeGroup/" + userId + "&" + groupId
    );
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
    responseData = (await axios.post(url + "/user/meetings/" + userId)).data;
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
      await axios.post(url + "/user/addMeeting/" + userId + "&" + meetingId)
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
      await axios.post(url + "/user/removeMeeting/" + userId + "&" + meetingId)
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
    const response = await axios.get(url + "/user/schedule/" + userId);
    if (response && response.data && response.status === 200) {
      return response.data.data;
    } else {
      console.error("Error retrieving user schedule");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function setUserSchedule(userId, schedule) {
  try {
    const response = await axios.post(url + "/user/setSchedule", {
      userId: userId,
      schedule: schedule,
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
    const response = (await axios.get(url + "/user/identifiers/" + id)).data;
    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response);
    }
  } catch (error) {
    console.error("Error: " + error);
  }
}
