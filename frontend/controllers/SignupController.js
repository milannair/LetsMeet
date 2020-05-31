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