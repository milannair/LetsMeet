const axios = require('axios').default;

const protocol = 'http://';
const baseUrl = '192.168.1.16';
const port = 8000;
const route = '/lm';

export async function getUser(id) {
  try {
    const response = await axios.get(protocol + baseUrl + ':' + port + route + '/user/' + id);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}