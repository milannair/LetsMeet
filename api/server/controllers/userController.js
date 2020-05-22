// Import user model
User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    const user = await User.findOne({ username: req.body.cred });
    const checkPhone = await User.findOne({ phone: req.body.phone });
    const checkEmail = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send("Username is taken. Choose another username");
    if (checkPhone)
      return res
        .status(400)
        .send("Looks like that phone number is registered to another account");
    if (checkEmail)
      return res
        .status(400)
        .send("Looks like that email is registered to another account");
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.create(req.body).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(newUser);
  },

  login: async (req, res) => {
    const usernameCheck = await User.findOne({ username: req.body.cred });
    const emailCheck = await User.findOne({ email: req.body.cred });
    if (!usernameCheck && !emailCheck)
      return res.status(400).send("Invalid email/username or password");
    const user = !usernameCheck ? emailCheck : usernameCheck;
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res.status(400).send("Invalid email/username or password");
    const token = jwt.sign({ _id: user._id }, process.env.privateKey);
    res.status(200).header("x-auth-token", token).send(true);
  },

  view: async (req, res) => {
    const singleUser = await User.findById(req.params.userId).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(singleUser);
  },

  delete: async (req, res) => {
    const deleteUser = await User.findByIdAndDelete(req.params.userId).catch(
      (err) =>
        res.json({
          status: 500,
          errorMessage: err.message,
          errorName: err.name,
        })
    );
    res.status(200).json(deleteUser);
  },

  update: async (req, res) => {
    const updateUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        runValidators: true,
      }
    ).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(updateUser);
  },

  userGroups: async (req, res) => {
    const userGroup = await User.findById(req.params.userId, {
      groups: 1,
    }).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(userGroup);
  },

  usersByUsername: async (req, res) => {
    const reg = "^" + req.params.username;
    const toFind = User.find(
      { username: { $regex: reg, $options: "<i>" } },
      { email: 1, username: 1 }
    ).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(toFind);
  },

  addGroupRequest: async (req, res) => {
    const addReq = User.findByIdAndUpdate(req.params.userId, {
      $push: { requests: req.params.groupId },
    }).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(addReq);
  },

  removeGroupRequest: async (req, res) => {
    const removeReq = User.findByIdAndUpdate(req.params.userId, {
      $pull: { requests: req.params.groupId },
    }).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(removeReq);
  },

  addGroup: async (req, res) => {
    const addGroup = User.findByIdAndUpdate(req.params.userId, {
      $push: { groups: req.params.groupId },
    }).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(addGroup);
  },

  removeGroup: async (req, res) => {
    const removeGroup = User.findByIdAndUpdate(req.params.userId, {
      $pull: { groups: req.params.groupId },
    }).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(removeGroup);
  },

  /*
   * Gets meetings for a particular user.
   *
   * Required query parameters:
   *  userId: ObjectId - the ID of the user
   *
   * Returns:
   *  500 if an internal server error occurs
   *  'null' if no user with the specified ID is found
   *  The array of the user's meetings for the user if the operation was
   *    successful
   */
  userMeetings: async (req, res) => {
    const userMeetings = await User.findById(req.params.userId, {
      meetings: 1,
    }).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(userMeetings);
  },

  /*
   * Adds a meeting to a particular user.
   *
   * Required query parameters:
   *  userId: ObjectId - the ID of the user
   *  meetingId: ObjectId - the ID of the meeting
   *
   * Returns:
   *  500 if an internal server error occurs
   *  Information about the user if the operation was successful
   */
  addMeeting: async (req, res) => {
    const user = User.findByIdAndUpdate(req.params.userId, {
      $push: { meetings: req.params.meetingId },
    }).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(user);
  },

  /*
   * Removes a meeting from a particular user.
   *
   * Required query parameters:
   *  userId: ObjectId - the ID of the user
   *  meetingId: ObjectId - the ID of the meeting
   *
   * Returns:
   *  500 if an internal server error occurs
   *  Information about the user if the operation was successful
   */
  removeMeeting: async (req, res) => {
    const user = User.findByIdAndUpdate(req.params.userId, {
      $pull: { meetings: req.params.meetingId },
    }).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(user);
  },
};
