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
var userController2 = require("./newUserController");

// user routes
router
  .route("/users")
  .get(userController.index)
  .post(userController2.createUser);

router
  .route("/user/:user_id")
  .get(userController2.getUser)
  .patch(userController2.updateUser)
  .put(userController.update)
  .delete(userController.delete);

// Export API routes
module.exports = router;
