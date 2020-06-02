import { url } from "../api-routes";
const axios = require("axios").default;
import { AsyncStorage } from "react-native";

export async function postUser(username, email, phone, password, displayName) {
  try {
    const response = await axios.post(url + "/user/create", {
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      phone: phone,
      password: password,
      displayName: displayName,
    });
    // Store the token
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('userId', response.data.data._id);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getUser(id) {
  let token = await AsyncStorage.getItem('token');
  let responseData = {};
  id = await id;
  try {
    responseData = await axios.get(url + "/user/" + id + "&" + token);
    if (responseData.status === 200) {
      return responseData.data;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function deleteUser(id) {
  let token = await AsyncStorage.getItem('token');
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
export async function updateUser(id) {
  let token = await AsyncStorage.getItem('token');
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
      await axios.post(url + "/user/login", {
        cred: credential.toLowerCase(),
        password: password,
      })
    );
    if (responseData.status === 200) {
      await AsyncStorage.setItem('token', responseData.data.token);
      await AsyncStorage.setItem('userId', responseData.data._id);
      return responseData;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function userGroups(id) {
  let token = await AsyncStorage.getItem('token');
  let responseData = {};
  try {
    responseData = (await axios.get(url + "/user/group/" + id + "&" + token))
    if (responseData.status === 200) {
      return responseData;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function getUserByUsername(username) {
  let token = await AsyncStorage.getItem('token');
  console.log(username);
  console.log(token);
  let responseData = {};
  try {
    responseData = (
      await axios.get(url + "/user/byUserName/" + username + "&" + token)
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
  let token = await AsyncStorage.getItem('token');
  let responseData = {};
  try {
    responseData = (
      await axios.post(
        url + "/user/addGroupRequest/" + userId + "&" + groupId + "&" + token
      )
    );
    if (responseData.status === 200) {
      return responseData.data;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function removeGroupRequest(userId, groupId) {
  let token = await AsyncStorage.getItem('token');
  let responseData = {};
  try {
    responseData = await axios.post(
      url + "/user/removeGroupRequest/" + userId + "&" + groupId + "&" + token
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
  let token = await AsyncStorage.getItem('token');
  let responseData = {};
  try {
    responseData = (
      await axios.post(
        url + "/user/addGroup/" + userId + "&" + groupId + "&" + token
      )
    );
    if (responseData.status === 200) {
      return responseData;
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}

export async function removeGroup(userId, groupId) {
  let token = await AsyncStorage.getItem('token');
  let responseData = {};
  try {
    responseData = await axios.post(
      url + "/user/removeGroup/" + userId + "&" + groupId + "&" + token
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
  let token = await AsyncStorage.getItem('token');
  let responseData = {};
  try {
    responseData = (
      await axios.post(url + "/user/meetings/" + userId + "&" + token)
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
  let token = await AsyncStorage.getItem('token');
  let responseData = {};
  try {
    responseData = (
      await axios.post(
        url + "/user/addMeeting/" + userId + "&" + meetingId + "&" + token
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
  let token = await AsyncStorage.getItem('token');
  let responseData = {};
  try {
    responseData = (
      await axios.post(
        url + "/user/removeMeeting/" + userId + "&" + meetingId + "&" + token
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
  let token = await AsyncStorage.getItem('token');
  try {
    const response = await axios.get(
      url + "/user/schedule/" + userId + "&" + token
    );
    if (response && response.data && response.status === 200) {
      return response.data.data;
    } else {
      console.error("Error retrieving user schedule");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getUsersSchedules(members) {
  try {
    let schedules = [];
    for (let i = 0; i < members.length; i++) {
      const user = await getUserSchedule(members[i]);
      user.schedule = user.schedule.map((timeSlot) => {
        return {
          startTime: new Date(timeSlot.startTime),
          endTime: new Date(timeSlot.endTime)
        };
      });
      schedules.push(...(user.schedule));
    }
    return schedules;
  } catch (error) {
    console.error(error);
  }
}

export async function setUserSchedule(userId, schedule) {
  let token = await AsyncStorage.getItem('token');
  try {
    const response = await axios.post(url + "/user/setSchedule" + "&" + token, {
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
  let token = await AsyncStorage.getItem('token');
  try {
    const response = (
      await axios.get(url + "/user/identifiers/" + id + "&" + token)
    ).data;
    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response);
    }
  } catch (error) {
    console.error("Error: " + error);
  }
}
