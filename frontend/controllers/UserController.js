const axios = require('axios').default;

const protocol = 'http://';
const baseUrl = 'localhost'; // change to your ipv4 address
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

export async function getUser(id) {
  let responseData = {}
  try {
    responseData = (await axios.get(protocol + baseUrl + ':' + port + route + '/user/' + id)).data;
    if(responseData.status === 200) {
      return responseData.data
    }
  } catch (error) {
    console.error(error);
  }
  return responseData;
}
