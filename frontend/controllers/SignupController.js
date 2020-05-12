const axios = require('axios').default;

const protocol = 'http://';
const baseUrl = '192.168.1.22';
const port = 8000;
const route = '/lm';

export async function postUser(username, email, phone, password, displayName) {
  try {
    const response = await axios.post(protocol + baseUrl + ':' + port + route + '/users', {
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