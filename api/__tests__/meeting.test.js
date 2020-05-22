// Tests for the /meeting endpoints

const constants = require("./ignored/constants");
const axios = require("axios").default;
const mongoose = require("mongoose");

describe("DELETE /meeting/:meetingId", () => {
  it("gets null data when invalid meeting is given", async () => {
    const response = await axios.delete(
      `${constants.API_URI}/meeting/${constants.FAKE_OBJECT_ID}`
    );
    expect(response.data).toBeNull();
  });
});

describe("/meeting/create", () => {
  it("creates a meeting with all arguments correctly", async () => {
    const author = mongoose.Types.ObjectId().toString();
    const name = "Test";
    const group = mongoose.Types.ObjectId().toString();
    const start = "2020-05-19T13:30:00.000Z";
    const end = "2020-05-19T17:30:00.000Z";
    const confirmed = true;

    let data;
    try {
      const response = await axios.post(
        `${constants.API_URI}/meeting/create`,
        {
          author: author,
          name: name,
          group: group,
          start: start,
          end: end,
          confirmed: confirmed,
        }
      );
      data = response.data;

      expect(data.author).toBe(author);
      expect(data.name).toBe(name);
      expect(data.group).toBe(group);
      expect(data.start).toBe(start);
      expect(data.end).toBe(end);
      expect(data.confirmed).toBe(confirmed);
    } finally {
      // Tear down
      await axios.delete(
        `${constants.API_URI}/meeting/${data._id}`
      );
    }
  });

  it("creates a meeting with only required arguments correctly", async () => {
    const author = mongoose.Types.ObjectId().toString();
    const name = "Test";
    const group = mongoose.Types.ObjectId().toString();
    const start = "2020-05-19T13:30:00.000Z";
    const end = "2020-05-19T17:30:00.000Z";

    let data;
    try {
      const response = await axios.post(
        `${constants.API_URI}/meeting/create`,
        {
          author: author,
          name: name,
          group: group,
          start: start,
          end: end,
        }
      );
      data = response.data;

      expect(data.author).toBe(author);
      expect(data.name).toBe(name);
      expect(data.group).toBe(group);
      expect(data.start).toBe(start);
      expect(data.end).toBe(end);
      expect(data.confirmed).toBe(false);
    } finally {
      // Tear down
      await axios.delete(
        `${constants.API_URI}/meeting/${data._id}`
      );
    }
  });
});

describe("GET /meeting/:meetingId", () => {
  it("gets null data when invalid meeting is given", async () => {
    const response = await axios.get(
      `${constants.API_URI}/meeting/${constants.FAKE_OBJECT_ID}`
    );
    expect(response.data).toBeNull();
  });

  it("gets a meeting with correct information", async () => {
    const author = mongoose.Types.ObjectId().toString();
    const name = "Test";
    const group = mongoose.Types.ObjectId().toString();
    const start = "2020-05-19T13:30:00.000Z";
    const end = "2020-05-19T17:30:00.000Z";
    const confirmed = true;

    let meeting, data;
    try {
      const meetingRes = await axios.post(
        `${constants.API_URI}/meeting/create`,
        {
          author: author,
          name: name,
          group: group,
          start: start,
          end: end,
          confirmed: confirmed,
        }
      );
      meeting = meetingRes.data;

      const response = await axios.get(
        `${constants.API_URI}/meeting/${meeting._id}`
      );
      data = response.data;

      expect(data.author).toBe(author);
      expect(data.name).toBe(name);
      expect(data.group).toBe(group);
      expect(data.start).toBe(start);
      expect(data.end).toBe(end);
      expect(data.confirmed).toBe(confirmed);
    } finally {
      // Tear down
      await axios.delete(
        `${constants.API_URI}/meeting/${meeting._id}`
      );
    }
  });
});

describe("PATCH /meeting/:meetingId", () => {
  it("gets null data when invalid meeting is given", async () => {
    const response = await axios.patch(
      `${constants.API_URI}/meeting/${constants.FAKE_OBJECT_ID}`
    );
    expect(response.data).toBeNull();
  });

  it("confirms a meeting", async () => {
    let meeting;
    try {
      const meetingRes = await axios.post(
        `${constants.API_URI}/meeting/create`,
        {
          author: mongoose.Types.ObjectId().toString(),
          name: "Test",
          group: mongoose.Types.ObjectId().toString(),
          start: "2020-05-19T13:30:00.000Z",
          end: "2020-05-19T17:30:00.000Z",
          confirmed: false,
        }
      );
      meeting = meetingRes.data;
      await axios.patch(
        `${constants.API_URI}/meeting/${meeting._id}`,
        {
          confirmed: true,
        }
      );
      const response = await axios.get(
        `${constants.API_URI}/meeting/${meeting._id}`
      );
      expect(response.data.confirmed).toBe(true);
    } finally {
      // Tear down
      await axios.delete(
        `${constants.API_URI}/meeting/${meeting._id}`
      );
    }
  });
});
