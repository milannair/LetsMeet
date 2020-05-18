const User = require("./userModel");

module.exports = {
  getUser: async (req, res) => {
    const user = await User.findById(req.params.user_id).catch((err) =>
      console.error("error ->", err)
    );
    res.json(user);
  },
  createUser: async (req, res) => {
    const newUser = await User.create(req.body).catch((err) =>
      console.error("error ->", err)
    );
    res.json(newUser);
  },
  deleteUser: async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.user_id).catch((err) =>
      console.error("error ->", err)
    );
    res.json(user);
  },
  updateUser: async (req, res) => {
    const updateUser = await User.findByIdAndUpdate(
      req.params.user_id,
      req.body,
      { runValidators: false }
    ).catch((err) => console.error("error ->", err));
    res.json(updateUser);
  },
};