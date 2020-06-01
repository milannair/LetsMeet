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

// Import meeting controller
let meetingRequestController = require("./controllers/meetingRequestController");
let optionController = require("./controllers/optionController");
var meetingController = require("./controllers/meetingController");

// User routes

// Create user
router.route("/user/create").post(userController.register);

//Login user
router.route("/user/login").post(userController.login);

// Get user by Id
router
  .route("/user/:userId&:auth_token")
  .get(userController.view)
  .delete(userController.delete)
  .patch(userController.update);

//Get user groups
router.route("/user/group/:userId&:auth_token").get(userController.userGroups);
// Get user's identifiers
router
  .route("/user/identifiers/:userId&:auth_token")
  .get(userController.getUserIdentifiers);
//Get users by username
router
  .route("/user/byUserName/:username&:auth_token")
  .get(userController.usersByUsername);

//Add group to list of group requests the user has -d
router
  .route("/user/addGroupRequest/:userId&:groupId&:auth_token")
  .post(userController.addGroupRequest);

// Get user's identifiers
router
  .route("/user/identifiers/:userId&:auth_token")
  .get(userController.getUserIdentifiers);

// Remove group request from the list of group requests the user has - d
router
  .route("/user/removeGroupRequest/:userId&:groupId&:auth_token")
  .post(userController.removeGroupRequest);

// Add group to the list of user's groups - d
router
  .route("/user/addGroup/:userId&:groupId&:auth_token")
  .post(userController.addGroup);

// Remove group from the list of user's groups - d
router
  .route("/user/removeGroup/:userId&:groupId&:auth_token")
  .post(userController.removeGroup);

// Get user meetings - d
router
  .route("/user/meetings/:userId&:auth_token")
  .get(userController.userMeetings);

// Add meeting to the list of user's meetings - d
router
  .route("/user/addMeeting/:userId&:meetingId&:auth_token")
  .post(userController.addMeeting);

// Remove meeting from the list of user's meetings - d
router
  .route("/user/removeMeeting/:userId&:meetingId&:auth_token")
  .post(userController.removeMeeting);

// Get user schedule
router.route("/user/schedule/:userId").get(userController.viewSchedule);

// Set the schedule of user
router.route("/user/setSchedule").post(userController.setSchedule);

//// Group paths ////

// Create a group
router.route("/groups/:auth_token").post(groupController.create);

// Delete a group
router.route("/group/delete/:auth_token").delete(groupController.delete);

//Get all the details about the group
router.route("/group/:groupId&:auth_token").get(groupController.view);

// // Get the group's name and id
router.route("/group/name/:groupId&:auth_token").get(groupController.name);

// // Change the group's name
router.route("/group/rename/:auth_token").post(groupController.rename);

// //Add member to the group
router.route("/group/addMemeber/:auth_token").post(groupController.addMember);

// //Add member to the group
router.route("/group/addMemeber/:auth_token").post(groupController.addMember);

// //Remove member the group
router
  .route("/group/removeMemeber/:auth_token")
  .post(groupController.removeMember);

// // Add member request to the group
router
  .route("/group/addMemberRequest/:auth_token")
  .post(groupController.addMemberRequest);

// // Remove member request from the group
router
  .route("/group/removeMemberRequest/:auth_token")
  .post(groupController.removeMemberRequest);

// // Add meeting request to the group
router
  .route("/group/addMeetingRequest/:auth_token")
  .post(groupController.addMeetingRequest);

// // Remove meeting request from the group
router
  .route("/group/removeMeetingRequest/:groupId&:meetingRequestId&:auth_token")
  .post(groupController.removeMeetingRequest);

///// MeetingRequest routes ////

// Create a meeting request
router.route("/meetingRequests/").post(meetingRequestController.create);

// Delete a meeting request
router
  .route("/meetingRequest/delete/:meetingRequestId&::auth_token")
  .delete(meetingRequestController.delete);

// Get all data about the meeting request
router
  .route("/meetingRequest/:meetingRequestId&:auth_token")
  .get(meetingRequestController.view);

// Update meeting name
router
  .route("/meetingRequest/rename/:meetingRequestId&:name&:auth_token")
  .post(meetingRequestController.rename);

// Update request type
router
  .route(
    "/meetingRequest/updateRequestType/:meetingRequestId&:isUnanimousMeetingRequest&:auth_token"
  )
  .post(meetingRequestController.updateRequestType);

// Add specified options to the meeting request options
router
  .route(
    "/meetingRequest/addRequestedOptions/:meetingRequestId&:requestedOptions&:auth_token"
  )
  .post(meetingRequestController.addRequestedOptions);

// Remove specified options from the meeting request
router
  .route(
    "/meetingRequest/removeRequestedOptions/:meetingRequestId&:requestedOptions&:auth_token"
  )
  .post(meetingRequestController.removeRequestedOptions);

// Update request status
router
  .route(
    "/meetingRequest/updateRequestStatus/:meetingRequestId&:status&:auth_token"
  )
  .post(meetingRequestController.updateRequestStatus);

///// Option routes ////

// Create an Option
router.route("/options/:auth_token").post(optionController.create);

// Delete an Option
router
  .route("/option/delete/:optionId&:auth_token")
  .delete(optionController.delete);

// View an Option
router.route("/option/:optionId&:auth_token").get(optionController.view);

// Update start time
router
  .route("/option/updateStart/:optionId&:start&:auth_token")
  .post(optionController.updateStart);

// Update end time
router
  .route("/option/updateEnd/:optionId&:end&:auth_token")
  .post(optionController.updateEnd);

// Add a vote
router
  .route("/option/addVote/:optionId&:userId&:groupId&:auth_token")
  .post(optionController.addVote);

// Remove a vote
router
  .route("/option/removeVote/:optionId&:userId&:groupId&:auth_token")
  .post(optionController.removeVote);

//// Meeting paths ////

//// Meeting paths ////

// Create a meeting
router.route("/meetings").post(meetingController.create);

// Delete a meeting
router.route("/meeting/delete/:meetingId").delete(meetingController.delete);

// Get all the details about a meeting
router.route("/meeting/:meetingId").get(meetingController.view);

// Confirm a meeting
router.route("/meeting/confirm/:meetingId").post(meetingController.confirm);

// Unconfirm a meeting
router.route("/meeting/unconfirm/:meetingId").post(meetingController.unconfirm);

// Export API routes
module.exports = router;
