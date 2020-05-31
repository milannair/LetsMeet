import { url } from '../api-routes';
const axios = require('axios').default;

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
        const response = await getUserMeetingIds(userId);
        for(let i = 0; i < response.length; i++) {
            const newResponse = (await axios.get(url + '/meeting/' + response[i])).data
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
        responseData = (await axios.get(url + '/user/meetings/' + userId)).data
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
        const newResponse = (await axios.get(url + '/group/name/' + groupId)).data
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

