import { url } from '../api-routes';
const axios = require('axios').default;

export async function createGroupMeetingRequest(author, groupId, name, isUnanimousMeetingRequest,
    requestedOptions, deadline, status) {
        let response = (await createMeetingRequest(author, groupId, name, isUnanimousMeetingRequest, requestedOptions,
            deadline, status)).data;
            if(response.status == 200) {
                let id = response.data._id;
                response = await addMeetingRequestToGroup(groupId, id);

            }

    }

export async function getMeetingRequest(meetingRequestId) {
    try{
        const response = (await axios.get(url + '/meetingRequest/' + meetingRequestId + "&" + token)).data;
        if(response.status === 200) {
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
        const response = await axios.post(url + '/meetingRequests/' + token, {
            author: author,
            groupId: groupId,
            name: name,
            isUnanimousMeetingRequest: isUnanimousMeetingRequest,
            requestedOptions: requestedOptions,
            deadline: deadline,
            status: status,
        });
        return response
    } catch(err) {
        console.log(err)
    }

}

async function addMeetingRequestToGroup(groupId, meetingRequestId) {
    try{
        return axios.post(url + '/group/addMeetingRequest/' + token, {
            groupId: groupId,
            meetingRequestId: meetingRequestId
        });
    } catch(err) {
        console.log(err);
    }
}