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
let userController = require("./controllers/userController");
let groupController = require("./controllers/groupController")
// User routes

// Create user
router
  .route("/users")
  .post(userController.register);

// Get user by Id
router
  .route('/user/:userId')
  .get(userController.view)

// Get user groups 
router
  .route('/userGroups/:userId')
  .get(userController.userGroups);

// Get users by email 
router
  .route('/users/:username')
  .get(userController.usersByUsername)

// Add group to the list of user's groups
router
  .route('/user/addGroup')
  .post(userController.addGroup)

// Add group to list of group requests the user has
router
  .route('/user/addRequest')
  .post(userController.addRequest)

// Group paths
router
  .route('/groups')
  .post(groupController.create)

// Export API routes
module.exports = router;
