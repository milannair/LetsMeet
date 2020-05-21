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
// Import all controllers for our models
let userController = require("./controllers/userController");
let groupController = require("./controllers/groupController");
let meetingRequestController = require("./controllers/meetingRequestController");
let optionController = require("./controllers/optionController");

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



///// MeetingRequest routes ////

// Create a meeting request
router
  .route('/meetingRequest/create/:author&:groupId&:name&:isUniPOll&:multiPoll&:uniPoll&:deadlin&:status')
  .post(meetingRequestController.create)

// Delete a meeting request
router
  .route('/meetingRequest/delete/:meetingRequestId')
  .delete(meetingRequestController.delete)

// Get all data about the meeting request
router
  .route('/meetingRequest/:meetingRequestId')
  .get(meetingRequestController.view)

// Update meeting name
router
  .route('/meetingRequest/rename/:meetingRequestId&:name')
  .post(meetingRequestController.rename)

// Update poll type
router
  .route('/meetingRequest/updatePollType/:meetingRequestId&:isUniPoll')
  .post(meetingRequestController.updatePollType)

// Update multiPoll options
router
  .route('/meetingRequest/updateMultiPoll/:meetingRequestId&:multiPoll')
  .post(meetingRequestController.updateMultiPollOptions)

// Update uniPoll options
router
  .route('/meetingRequest/updateUniPoll/:meetingRequestId&:uniPoll')
  .post(meetingRequestController.updateUniPollOptions)

// Update request status
router
  .route('/meetingRequest/updateStatus/:meetingRequestId&:status')
  .post(meetingRequestController.updateStatus)


///// Option routes ////


// Create an Option
router
  .route('/option/create/:start&:end&:votes')
  .post(optionController.create)

// Delete an Option
router
  .route('/option/delete/:optionId')
  .delete(optionController.delete)

// View an Option
router
  .route('/option/:optionId')
  .get(optionController.view)

// Update start time
router
.route('/option/updateStart/:optionId&:start')
.post(optionController.updateStart)

// Update end time
router
.route('/option/updateEnd/:optionId&:end')
.post(optionController.updateEnd)

// Add a vote
router
.route('/option/addVote/:optionId&:userId')
.post(optionController.addVote)

// Remove a vote
router
.route('/option/removeVote/:optionId&:userId')
.post(optionController.removeVote)

// Export API routes
module.exports = router;
