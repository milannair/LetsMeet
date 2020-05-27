const axios = require('axios').default;
const protocol = 'http://';
const baseUrl = '10.0.0.224';
const port = 8000;
const route = '/lm';
const url = protocol + baseUrl + ':' + port + route

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