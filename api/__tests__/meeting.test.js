// Tests for the /meeting and /meetings endpoints

const constants = require('./ignored/constants');
const axios = require('axios').default;
const mongoose = require('mongoose');

describe('/meeting/delete/:meetingId', () => {
  it('gets null data when invalid meeting is given', async () => {
    const response = await axios.delete(
      constants.API_URI + '/meeting/delete/' + constants.FAKE_OBJECT_ID
    );
    expect(response.data.data).toBeNull();
  });
});

describe('/meetings', () => {
  it('creates a meeting with all arguments correctly', async () => {
    const author = mongoose.Types.ObjectId().toString();
    const name = 'Test';
    const groupId = mongoose.Types.ObjectId().toString();
    const startTime = '2020-05-19T13:30:00.000Z';
    const endTime = '2020-05-19T17:30:00.000Z';
    const confirmed = true;

    let data;
    try {
      const response = await axios.post(constants.API_URI + '/meetings', {
        author: author,
        name: name,
        groupId: groupId,
        startTime: startTime,
        endTime: endTime,
        confirmed: confirmed,
      });
      data = response.data.data;

      expect(data.author).toBe(author);
      expect(data.name).toBe(name);
      expect(data.groupID).toBe(groupId);
      expect(data.startTime).toBe(startTime);
      expect(data.endTime).toBe(endTime);
      expect(data.confirmed).toBe(confirmed);
    } finally {
      // Tear down
      await axios.delete(
        constants.API_URI + '/meeting/delete/' + data._id
      );
    }
  });

  it('creates a meeting with only required arguments correctly', async () => {
    const author = mongoose.Types.ObjectId().toString();
    const name = 'Test';
    const groupId = mongoose.Types.ObjectId().toString();
    const startTime = '2020-05-19T13:30:00.000Z';
    const endTime = '2020-05-19T17:30:00.000Z';

    let data;
    try {
      const response = await axios.post(constants.API_URI + '/meetings', {
        author: author,
        name: name,
        groupId: groupId,
        startTime: startTime,
        endTime: endTime,
      });
      data = response.data.data;

      expect(data.author).toBe(author);
      expect(data.name).toBe(name);
      expect(data.groupID).toBe(groupId);
      expect(data.startTime).toBe(startTime);
      expect(data.endTime).toBe(endTime);
      expect(data.confirmed).toBe(false);
    } finally {
      // Tear down
      await axios.delete(
        constants.API_URI + '/meeting/delete/' + data._id
      );
    }
  });
});

describe('/meeting/:meetingId', () => {
  it('gets null data when invalid meeting is given', async () => {
    const response = await axios.get(
      constants.API_URI + '/meeting/' + constants.FAKE_OBJECT_ID
    );
    expect(response.data.data).toBeNull();
  });

  it('gets a meeting with correct information', async () => {
    const author = mongoose.Types.ObjectId().toString();
    const name = 'Test';
    const groupId = mongoose.Types.ObjectId().toString();
    const startTime = '2020-05-19T13:30:00.000Z';
    const endTime = '2020-05-19T17:30:00.000Z';
    const confirmed = true;

    let meeting, data;
    try {
      const meetingRes = await axios.post(constants.API_URI + '/meetings', {
        author: author,
        name: name,
        groupId: groupId,
        startTime: startTime,
        endTime: endTime,
        confirmed: confirmed,
      });
      meeting = meetingRes.data.data;

      const response = await axios.get(
        constants.API_URI + '/meeting/' + meeting._id
      );
      data = response.data.data;

      expect(data.author).toBe(author);
      expect(data.name).toBe(name);
      expect(data.groupID).toBe(groupId);
      expect(data.startTime).toBe(startTime);
      expect(data.endTime).toBe(endTime);
      expect(data.confirmed).toBe(confirmed);
    } finally {
      // Tear down
      await axios.delete(
        constants.API_URI + '/meeting/delete/' + meeting._id
      );
    }
  });
});

describe('/meeting/confirm/:meetingId', () => {
  it('gets 404 status when invalid meeting is given', async () => {
    const response = await axios.post(
      constants.API_URI + '/meeting/confirm/' + constants.FAKE_OBJECT_ID
    );
    expect(response.data.status).toBe(404);
  });

  it('gets 409 status when confirming a confirmed meeting', async () => {
    let meeting, data;
    try {
      const meetingRes = await axios.post(constants.API_URI + '/meetings', {
        author: mongoose.Types.ObjectId().toString(),
        name: 'Test',
        groupId: mongoose.Types.ObjectId().toString(),
        startTime: '2020-05-19T13:30:00.000Z',
        endTime: '2020-05-19T17:30:00.000Z',
        confirmed: true,
      });
      meeting = meetingRes.data.data;

      const response = await axios.post(
        constants.API_URI + '/meeting/confirm/' + meeting._id
      );
      expect(response.data.status).toBe(409);
    } finally {
      // Tear down
      await axios.delete(
        constants.API_URI + '/meeting/delete/' + meeting._id
      );
    }
  });

  it('confirms an unconfirmed meeting successfully', async () => {
    let meeting, data;
    try {
      const meetingRes = await axios.post(constants.API_URI + '/meetings', {
        author: mongoose.Types.ObjectId().toString(),
        name: 'Test',
        groupId: mongoose.Types.ObjectId().toString(),
        startTime: '2020-05-19T13:30:00.000Z',
        endTime: '2020-05-19T17:30:00.000Z',
        confirmed: false,
      });
      meeting = meetingRes.data.data;

      const response = await axios.post(
        constants.API_URI + '/meeting/confirm/' + meeting._id
      );
      expect(response.data.data.confirmed).toBe(true);
    } finally {
      // Tear down
      await axios.delete(
        constants.API_URI + '/meeting/delete/' + meeting._id
      );
    }
  });
});

describe('/meeting/unconfirm/:meetingId', () => {
  it('gets 404 status when invalid meeting is given', async () => {
    const response = await axios.post(
      constants.API_URI + '/meeting/unconfirm/' + constants.FAKE_OBJECT_ID
    );
    expect(response.data.status).toBe(404);
  });

  it('gets 409 status when unconfirming a not confirmed meeting', async () => {
    let meeting, data;
    try {
      const meetingRes = await axios.post(constants.API_URI + '/meetings', {
        author: mongoose.Types.ObjectId().toString(),
        name: 'Test',
        groupId: mongoose.Types.ObjectId().toString(),
        startTime: '2020-05-19T13:30:00.000Z',
        endTime: '2020-05-19T17:30:00.000Z',
        confirmed: false,
      });
      meeting = meetingRes.data.data;

      const response = await axios.post(
        constants.API_URI + '/meeting/unconfirm/' + meeting._id
      );
      expect(response.data.status).toBe(409);
    } finally {
      // Tear down
      await axios.delete(
        constants.API_URI + '/meeting/delete/' + meeting._id
      );
    }
  });

  it('unconfirms a confirmed meeting successfully', async () => {
    let meeting, data;
    try {
      const meetingRes = await axios.post(constants.API_URI + '/meetings', {
        author: mongoose.Types.ObjectId().toString(),
        name: 'Test',
        groupId: mongoose.Types.ObjectId().toString(),
        startTime: '2020-05-19T13:30:00.000Z',
        endTime: '2020-05-19T17:30:00.000Z',
        confirmed: true,
      });
      meeting = meetingRes.data.data;

      const response = await axios.post(
        constants.API_URI + '/meeting/unconfirm/' + meeting._id
      );
      expect(response.data.data.confirmed).toBe(false);
    } finally {
      // Tear down
      await axios.delete(
        constants.API_URI + '/meeting/delete/' + meeting._id
      );
    }
  });
});
