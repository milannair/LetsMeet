const axios = require('axios').default;

export async function getUser(id) {
  try {
    const response = await axios.get('http://[YOUR IPV4 ADDRESS]:8000/lm/users', {
        params: {
          id: id
        }
      });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}