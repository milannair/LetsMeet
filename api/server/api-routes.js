// api-routes.js
// Initialize express router
let router = require("express").Router();
// Set default API response
router.get("/", function (req, res) {
  res.json({
    status: "Live",
    message: "LetsMeet API",
  });
});
// Import user controller
var userController = require("./userController");

// User routes

// Create user
router
  .route("/users")
  .get(userController.index)
  .post(userController.register);

// Get user by Id
router
  .route('/user/:user_id')
  .get(userController.view)

// Get user groups 
router
  .route('/userGroups/:user_id')
  .get(userController.userGroups);

// Get users by email 
router
  .route('/users/:username')
  .get(userController.usersByUsername)


// router
//   .route("/user/:user_id")
//   .get(userController.view)
//   .patch(userController.update)
//   .put(userController.update)
//   .delete(userController.delete);

// Export API routes
module.exports = router;
