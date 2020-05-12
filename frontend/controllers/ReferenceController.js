const axios = require('axios').default;

const protocol = 'http://'
const baseUrl = '[YOUR IPV4 ADDRESS HERE]';
const port = 8000
const route = '/lm'

export async function getUser(id) {
  try {
    const response = await axios.get(protocol + baseUrl + ':' + port + route + '/users', {
        params: {
          id: id
        }
      });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}