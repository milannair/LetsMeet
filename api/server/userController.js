// userController.js
// Import user model
User = require("./userModel");

// Handle index actions
exports.index = function (req, res) {
  User.get(function (err, users) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "user retrieved successfully",
      data: users,
    });
  });
};
// Handle create user actions
exports.register = function (req, res) {
  var user = new User();
  user.name = req.body.name ? req.body.name : user.name;
  user.username = req.body.username;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.password = req.body.password;
  user.displayName = req.body.displayName;
  // save the user and check for errors
  user.save(function (err) {
    // if (err)
    //     res.json(err);
    res.json({
      message: "New user created!",
      data: user,
    });
  });
};
// Handle view user info
exports.view = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) res.send(err);
    res.json({
      message: "user details loading..",
      data: user,
    });
  });
};
// Handle update user info
exports.update = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) res.send(err);
    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.password = req.body.password;
    // save the user and check for errors
    user.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "user Info updated",
        data: user,
      });
    });
  });
};
// Handle delete user
exports.delete = function (req, res) {
  User.deleteOne(
    {
      _id: req.params.user_id,
    },
    function (err, user) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "user deleted",
      });
    }
  );
};
