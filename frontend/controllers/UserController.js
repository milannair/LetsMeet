const axios = require('axios').default;
const protocol = 'http://';
const baseUrl = 'localhost';
const port = 8000;
const route = '/lm';
const url = protocol + baseUrl + ':' + port + route

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
