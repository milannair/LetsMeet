// Tests for the /user and /users endpoints

const constants = require('./ignored/constants');
const axios = require('axios').default;

describe('/user/meetings/:userId', () => {
  it('gets 404 status when invalid user is given', async () => {
    const response = await axios.get(
      constants.API_URI + '/user/meetings/' + constants.FAKE_OBJECT_ID
    );
    expect(response.data.status).toBe(404);
  });
});

describe('/user/addMeeting', () => {
  it('removes a meeting from a user', async () => {
    let userId;
    try {
      const meetingId = constants.FAKE_OBJECT_ID

      const userRes = await axios.post(constants.API_URI + '/users', {
        username: 'testuser',
        email: 'test@example.com',
        phone: '123456789',
        password: 'DontUseThisPassword',
        displayName: 'TestUser',
      });
      userId = userRes.data.data._id;
      await axios.post(constants.API_URI + '/user/addMeeting', {
        userId: userId,
        meetingId: meetingId,
      });
      const response = await axios.get(constants.API_URI + '/user/' + userId);
      expect(response.data.data.meetings).toContain(meetingId);
    } finally {
      // TODO: tear down with REST API when user deletion endpoint is available
    }
  });
});

describe('/user/removeMeeting', () => {
  it('adds a meeting to a user', async () => {
    let userId;
    try {
      const meetingId = constants.FAKE_OBJECT_ID

      const userRes = await axios.post(constants.API_URI + '/users', {
        username: 'testuser',
        email: 'test@example.com',
        phone: '123456789',
        password: 'DontUseThisPassword',
        displayName: 'TestUser',
      });
      userId = userRes.data.data._id;
      await axios.post(constants.API_URI + '/user/addMeeting', {
        userId: userId,
        meetingId: meetingId,
      });
      await axios.post(constants.API_URI + '/user/removeMeeting', {
        userId: userId,
        meetingId: meetingId,
      });
      const response = await axios.get(constants.API_URI + '/user/' + userId);
      expect(response.data.data.meetings).toHaveLength(0);
    } finally {
      // TODO: tear down with REST API when user deletion endpoint is available
    }
  });
});
