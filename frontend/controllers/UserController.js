const axios = require("axios").default;

const protocol = "http://";
const baseUrl = "localhost"; // change to your ipv4 address
const port = 8000;
const route = "/lm";

export async function postUser(username, email, phone, password, displayName) {
  try {
    const response = await axios.post(
      protocol + baseUrl + ":" + port + route + "/user/create",
      {
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
