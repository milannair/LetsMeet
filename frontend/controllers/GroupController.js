const axios = require('axios').default;
const protocol = 'http://';
const baseUrl = '127.0.0.1';
const port = 8000;
const route = '/lm';
const url = protocol + baseUrl + ':' + port + route

export async function getUsers(username) {
    let responseData = {}
    try {
        responseData = (await axios.get(url + '/users/' + username)).data
        if(responseData.status === 200) {
            return responseData.data
        }     
    } catch(error) {
        console.log(error)
    }
    return responseData

}

export async function getUserGroupIds(userId) {
    let responseData = {}
    try {
        responseData = (await axios.get(url + '/user/groups/' + userId)).data
        if(responseData.status === 200) {
            return responseData.data
        }     
    } catch(error) {
        console.log(error)
    }
    return responseData

}

export async function getUserGroups(userId) {
    let groups = []
    try {
        const response = await getUserGroupIds(userId);
        for(let i = 0; i < response.length; i++) {
            const newResponse = (await axios.get(url + '/group/name/' + response[i])).data
            if(newResponse.status === 200) {
                groups.push(newResponse.data)
            } else {
                console.log(newResponse)
            }
        }

    } catch(error) {
        console.log(error)
    }
    return groups
}