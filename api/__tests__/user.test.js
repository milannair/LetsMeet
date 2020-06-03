// Tests for the /user endpoints

const constants = require("./ignored/constants");
const variables = require("./ignored/variables");
const axios = require("axios").default;

describe("/user/meetings/:userId", () => {
  it("gets 404 status when invalid user is given", async () => {
    try {
      const meetingId = constants.FAKE_OBJECT_ID;
      const token = variables.token;

      await axios.get(
        `${constants.API_URI}/user/meetings/${meetingId}&${token}`
      );
      fail("No errors detected for the test request");
    } catch (err) {
      // Errors are expected
      expect(err.response.status).toBe(404);
    }
  });
});

describe("/user/addMeeting", () => {
  it("adds a meeting to a user", async () => {
    const meetingId = constants.FAKE_OBJECT_ID;
    const userId = variables.userId;
    const token = variables.token;

    await axios.post(
      `${constants.API_URI}/user/addMeeting/${userId}&${meetingId}&${token}`
    );
    const response = await axios.get(
      `${constants.API_URI}/user/${userId}&${token}`
    );
    expect(response.data.meetings).toContain(meetingId);
  });
});

describe("/user/removeMeeting", () => {
  it("removes a meeting from a user", async () => {
    const meetingId = constants.FAKE_OBJECT_ID;
    const userId = variables.userId;
    const token = variables.token;

    await axios.post(
      `${constants.API_URI}/user/addMeeting/${userId}&${meetingId}&${token}`
    );
    await axios.post(
      `${constants.API_URI}/user/removeMeeting/${userId}&${meetingId}&${token}`
    );
    const response = await axios.get(
      `${constants.API_URI}/user/${userId}&${token}`
    );
    expect(response.data.meetings).toHaveLength(0);
  });
});
