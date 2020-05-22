const axios = require('axios').default;
const protocol = 'http://';
const baseUrl = '127.0.0.1';
const port = 8000;
const route = '/lm';
const url = protocol + baseUrl + ':' + port + route

// export async function createGroupMeetingRequest(author, groupId, name, isUnanimousMeetingRequest,
//     requestedOptions, deadline, status) {

//     }

async function createMeetingRequest(author, groupId, name, isUnanimousMeetingRequest,
    requestedOptions, deadline, status) {

    try{
        return response = (await axios.post(url + '/meetingRequest/' + author + '&'+
        groupId + '&' + name + '&' + isUnanimousMeetingRequest + '&' + requestedOptions + '&' + 
        deadline + '&' + status)).data;
    } catch(err) {
        console.log(err)
    }

}