import { url } from '../api-routes';
const axios = require('axios').default;
import { AsyncStorage } from "react-native";
let token = AsyncStorage.getItem('token');

export async function createOption(start, end, votes) {
    try {
        let token = await AsyncStorage.getItem('token');
        const response =(await axios.post(url + '/options/' + token, {
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
        let token = await AsyncStorage.getItem('token');
        const response = (await axios.get(url + '/option/' + optionId + "&" + token)).data
        if(response.status === 200) {
            return response.data;
        } else {
            console.log(response);
        }
    } catch(err) {
        console.log(err);
    }
}

export async function addVote(optionId, userId, groupId) {
    try {
        let token = await AsyncStorage.getItem('token');
        const response = (await axios.post(url + '/option/addVote/' + optionId + '&' + userId + "&" + groupId + "&" + token)).data;
        if (response.status === 200) {
            return response.data;
        } else {
            console.log(response);
        }
    } catch(err) {
        console.log(err);
    }
}

export async function removeVote(optionId, userId, groupId) {
    try {
        let token = await AsyncStorage.getItem('token');
        const response = (await axios.post(url + '/option/removeVote/' + optionId + '&' + userId + "&" + groupId + "&" + token)).data;
        if (response.status === 200) {
            return response.data;
        } else {
            console.log(response);
        }
    } catch(err) {
        console.log(err);
    }
}
