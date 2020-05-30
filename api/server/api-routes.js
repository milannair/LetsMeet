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
// Import meeting controller
var meetingController = require("./controllers/meetingController");

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
  .route('/user/groups/:userId')
  .get(userController.userGroups);

// Get users by username 
router
  .route('/users/:username')
  .get(userController.usersByUsername)

// Delete user by id
router
  .route('/users/:userid')
  .delete(userController.delete)

// Add group to list of group requests the user has
router
  .route('/user/addGroupRequest')
  .post(userController.addGroupRequest)

// Remove group request from the list of group requests the user has
router
  .route('/user/removeGroupRequest')
  .post(userController.removeGroupRequest)

// Add group to the list of user's groups
router
  .route('/user/addGroup')
  .post(userController.addGroup)

// Remove group from the list of user's groups
router
  .route('/user/removeGroup')
  .post(userController.removeGroup)

// Get user meetings
router
  .route('/user/meetings/:userId')
  .get(userController.userMeetings);

// Add meeting to the list of user's meetings
router
  .route('/user/addMeeting')
  .post(userController.addMeeting);

// Remove meeting from the list of user's meetings
router
  .route('/user/removeMeeting')
  .post(userController.removeMeeting);


  //// Group paths ////


// Create a group
router
  .route('/groups')
  .post(groupController.create)

// Delete a group
router
  .route('/group/delete')
  .delete(groupController.delete)

//Get all the details about the group
router
  .route('/group/:groupId')
  .get(groupController.view)

// Get the group's name and id
router
  .route('/group/name/:groupId')
  .get(groupController.name)

// Change the group's name
router
  .route('/group/rename')
  .post(groupController.rename)

//Add member to the group
router
  .route('/group/addMemeber')
  .post(groupController.addMember)

//Add member to the group
router
  .route('/group/addMemeber')
  .post(groupController.addMember)

//Remove member the group
router
  .route('/group/removeMemeber')
  .post(groupController.removeMember)

// Add member request to the group
router
  .route('/group/addMemberRequest')
  .post(groupController.addMemberRequest)

// Remove member request from the group
router
  .route('/group/removeMemberRequest')
  .post(groupController.removeMemberRequest)

// Add meeting request to the group
router
  .route('/group/addMeetingRequest')
  .post(groupController.addMeetingRequest)

// Remove meeting request from the group
router
  .route('/group/removeMeetingRequest')
  .post(groupController.removeMeetingRequest)


  //// Meeting paths ////


// Create a meeting
router
  .route('/meetings')
  .post(meetingController.create);

// Delete a meeting
router
  .route('/meeting/delete/:meetingId')
  .delete(meetingController.delete);

// Get all the details about a meeting
router
  .route('/meeting/:meetingId')
  .get(meetingController.view);

// Confirm a meeting
router
  .route('/meeting/confirm/:meetingId')
  .post(meetingController.confirm);

// Unconfirm a meeting
router
  .route('/meeting/unconfirm/:meetingId')
  .post(meetingController.unconfirm);


//// Meeting paths ////

// Create a meeting
router
  .route('/meetings')
  .post(meetingController.create);

// Delete a meeting
router
  .route('/meeting/delete/:meetingId')
  .delete(meetingController.delete);

// Get all the details about a meeting
router
  .route('/meeting/:meetingId')
  .get(meetingController.view);

// Confirm a meeting
router
  .route('/meeting/confirm/:meetingId')
  .post(meetingController.confirm);

// Unconfirm a meeting
router
  .route('/meeting/unconfirm/:meetingId')
  .post(meetingController.unconfirm);


// Export API routes
module.exports = router;
