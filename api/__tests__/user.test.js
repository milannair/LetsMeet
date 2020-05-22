// Tests for the /user and /users endpoints

const constants = require("./ignored/constants");
const axios = require("axios").default;

describe("/user/meetings/:userId", () => {
  it("gets 404 status when invalid user is given", async () => {
    try {
      await axios.get(
        `${constants.API_URI}/user/meetings/${constants.FAKE_OBJECT_ID}`
      );
    } catch (err) {
      // Errors are expected
      expect(err.response.status).toBe(404);
    }
  });
});

describe("/user/addMeeting", () => {
  it("adds a meeting to a user", async () => {
    let userId;
    try {
      const meetingId = constants.FAKE_OBJECT_ID;

      const userRes = await axios.post(
        `${constants.API_URI}/user/create`,
        {
          username: "testuser",
          email: "test@example.com",
          phone: "1234567890",
          password: "DontUseThisPassword",
          displayName: "TestUser",
        }
      );
      userId = userRes.data._id;
      await axios.post(
        `${constants.API_URI}/user/addMeeting/${userId}/${meetingId}`
      );
      const response = await axios.get(`${constants.API_URI}/user/${userId}`);
      expect(response.data.meetings).toContain(meetingId);
    } finally {
      axios.delete(`${constants.API_URI}/user/${userId}`);
    }
  });
});

describe("/user/removeMeeting", () => {
  it("removes a meeting from a user", async () => {
    let userId;
    try {
      const meetingId = constants.FAKE_OBJECT_ID;

      const userRes = await axios.post(
        `${constants.API_URI}/user/create`,
        {
          username: "testuser",
          email: "test@example.com",
          phone: "1234567890",
          password: "DontUseThisPassword",
          displayName: "TestUser",
        }
      );
      userId = userRes.data._id;
      await axios.post(
        `${constants.API_URI}/user/addMeeting/${userId}/${meetingId}`
      );
      await axios.post(
        `${constants.API_URI}/user/removeMeeting/${userId}/${meetingId}`
      );
      const response = await axios.get(`${constants.API_URI}/user/${userId}`);
      expect(response.data.meetings).toHaveLength(0);
    } finally {
      axios.delete(`${constants.API_URI}/user/${userId}`);
    }
  });
});
