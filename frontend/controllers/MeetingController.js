import { url } from '../api-routes';
const axios = require('axios').default;
import { AsyncStorage } from "react-native";
let token = AsyncStorage.getItem('token');

export async function getUserMeetingsWithGroups(userId) {
    let meetings = []
    try {
        meetings = await getUserMeetings(userId);
        for(let i = 0; i < meetings.length; i++) {
            let group = null
            try {
                group = await getGroup(meetings[i].groupID);
            } catch (error) {
                console.log(error)
                return meetings;
            }
            meetings[i].groupName = group.name;
        }
    } catch (error) {}
    return meetings;
}

// Helper Functions

export async function getUserMeetings(userId) {
    let meetings = []
    try {
        let token = await AsyncStorage.getItem('token');
        const response = await getUserMeetingIds(userId);
        for(let i = 0; i < response.length; i++) {
            const newResponse = (await axios.get(url + '/meeting/' + response[i] + '&' + token)).data
            if(newResponse.status === 200) {
                meetings.push(newResponse.data)
            } else {
                console.log(newResponse)
            }
        }
    } catch(error) {
        console.log(error)
    }
    return meetings
}

async function getUserMeetingIds(userId) {
    let responseData = {}
    try {
        let token = await AsyncStorage.getItem('token');
        responseData = (await axios.get(url + '/user/meetings/' + userId + '&' + token)).data
        if(responseData.status === 200) {
            return responseData.data
        }     
    } catch(error) {
        console.log(error)
    }
    return responseData

}

export async function getGroup(groupId) {
    let group = null
    try {     
        let token = await AsyncStorage.getItem('token');
        const newResponse = (await axios.get(url + '/group/name/' + groupId + '&' + token)).data
        if(newResponse.status === 200) {
            group = newResponse.data
        } else {
            console.log(newResponse)
        }
    } catch(error) {
        console.log(error)
    }
    return group
}

export async function postMeeting(groupId, name, startTime, endTime) {
    try {
        let token = await AsyncStorage.getItem('token');
        const response = await axios.post(url + "/meetings/" + token, {
            author: AsyncStorage.getItem('userId'),
            name: name,
            groupID: groupId,
            startTime: startTime,
            endTime: endTime,
            confirmed: false,
        });
        if (response.data.status === 200) {
            return response;
        } else {
            console.log(response);
        }
    } catch (error) {
        console.log(error);
    }
}