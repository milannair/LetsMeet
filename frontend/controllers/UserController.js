import { url } from '../api-routes';
const axios = require('axios').default;

export async function postUser(username, email, phone, password, displayName) {
  try {
    const response = await axios.post(url + '/users', {
        username: username,
        email: email,
        phone: phone,
        password: password,
        displayName: displayName
      });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getUser(id) {
  let responseData = {}
  try {
    responseData = (await axios.get(url+ '/user/' + id)).data;
    if(responseData.status === 200) {
      return responseData.data
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
}
