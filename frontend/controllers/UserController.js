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
  try {
    const response = await axios.get(url + '/user/' + id);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
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
