const axios = require('axios').default;
const protocol = 'http://';
const baseUrl = '127.0.0.1';
const port = 8000;
const route = '/lm';
const url = protocol + baseUrl + ':' + port + route

export async function createGroupMeetingRequest(author, groupId, name, isUnanimousMeetingRequest,
    requestedOptions, deadline, status) {
        let response = (await createGroupMeetingRequest(author, groupId, name, isUnanimousMeetingRequest, requestedOptions,
            deadline, status)).data;
            if(response.status == 200) {
                addMeetingRequestToGroup(groupId, data._id);
            }

    }

export async function getMeetingRequest(meetingRequestId) {
    try{
        const response = (await axios.get(url + '/meetingRequest/' + meetingRequestId)).data;
        if(data.status === 200) {
            return response.data;
        } else {
            console.log(response);
        }
    }catch(err) {
        console.log(err);
    }
}

async function createMeetingRequest(author, groupId, name, isUnanimousMeetingRequest,
    requestedOptions, deadline, status) {

    try{
        return axios.post(url + '/meetingRequest/' + author + '&'+
        groupId + '&' + name + '&' + isUnanimousMeetingRequest + '&' + requestedOptions + '&' + 
        deadline + '&' + status);
    } catch(err) {
        console.log(err)
    }

}

async function addMeetingRequestToGroup(groupId, meetingRequestId) {
    try{
        return response = axios.post(url + '/addMeetingRequest/' + groupId + '&' + meetingRequestId);
    } catch(err) {
        console.log(err);
    }
}