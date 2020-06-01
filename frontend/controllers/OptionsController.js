import { url } from '../api-routes';
const axios = require('axios').default;

export async function createOption(start, end, votes) {
    try {
        console.log('got here')
        const response =(await axios.post(url + '/options/', {
            start: start,
            end: end,
            votes: votes,
        })).data
        if(response.status === 200) {
            return response.data;
        } else {
            console.log(response);
        }
    } catch(err) {
        console.log(err);
    }
}


export async function getOption(optionId) {
    try {
        const response = (await axios.get(url + '/option/' + optionId)).data
        if(response.status === 200) {
            return response.data;
        } else {
            console.log(response);
        }
    } catch(err) {
        console.log(err);
    }
}

export async function addVote(optionId, userId) {
    try {
        const response = (await axios.post(url + '/option/addVote/' + optionId + '&' + userId)).data;
        if (response.status === 200) {
            return response.data;
        } else {
            console.log(response);
        }
    } catch(err) {
        console.log(err);
    }
}

export async function removeVote(optionId, userId) {
    try {
        const response = (await axios.post(url + '/option/removeVote/' + optionId + '&' + userId)).data;
        if (response.status === 200) {
            return response.data;
        } else {
            console.log(response);
        }
    } catch(err) {
        console.log(err);
    }
}
