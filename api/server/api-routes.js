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
let meetingController = require("./controllers/meetingController");

// User routes

// Create user - d
router.route("/user/create").post(userController.register);

//Login user - d
router.route("/user/login").post(userController.login);

// Get user by Id - d
router
  .route("/user/:userId")
  .get(userController.view)
  .delete(userController.delete)
  .patch(userController.update);

//Get user groups - d
router.route("/user/group/:userId").get(userController.userGroups);
// Get user's identifiers
// router
//   .route('/user/identifiers/:userId')
//   .get(userController.getUserIdentifiers)
//Get users by username - d
router.route("/user/byUserName/:username").get(userController.usersByUsername);

//Add group to list of group requests the user has -d
router
  .route("/user/addGroupRequest/:userId&:groupId")
  .post(userController.addGroupRequest);

// Get user's identifiers
router
  .route("/user/identifiers/:userId")
  .get(userController.getUserIdentifiers);

// Remove group request from the list of group requests the user has - d
router
  .route("/user/removeGroupRequest/:userId&:groupId")
  .post(userController.removeGroupRequest);

// Add group to the list of user's groups - d
router.route("/user/addGroup/:userId&:groupId").post(userController.addGroup);

// Remove group from the list of user's groups - d
router
  .route("/user/removeGroup/:userId&:groupId")
  .post(userController.removeGroup);

// Get user meetings - d
router.route("/user/meetings/:userId").get(userController.userMeetings);

// Add meeting to the list of user's meetings - d
router
  .route("/user/addMeeting/:userId/:meetingId")
  .post(userController.addMeeting);

// Remove meeting from the list of user's meetings - d
router
  .route("/user/removeMeeting/:userId/:meetingId")
  .post(userController.removeMeeting);

// Get user schedule
router.route("/user/schedule/:userId").get(userController.viewSchedule);

// Set the schedule of user
router.route("/user/setSchedule").post(userController.setSchedule);

//// Group paths ////

// Create a group
router.route("/group").post(groupController.create);

// Delete a group
router.route("/group/delete").delete(groupController.delete);

//Get all the details about the group
router.route("/group/:groupId").get(groupController.view);

// // Get the group's name and id
router.route("/group/name/:groupId").get(groupController.name);

// // Change the group's name
router.route("/group/rename").post(groupController.rename);

// //Add member to the group
router.route("/group/addMemeber").post(groupController.addMember);

// //Add member to the group
router.route("/group/addMemeber").post(groupController.addMember);

// //Remove member the group
router.route("/group/removeMemeber").post(groupController.removeMember);

// // Add member request to the group
router.route("/group/addMemberRequest").post(groupController.addMemberRequest);

// // Remove member request from the group
router
  .route("/group/removeMemberRequest")
  .post(groupController.removeMemberRequest);

// // Add meeting request to the group
router
  .route("/group/addMeetingRequest/")
  .post(groupController.addMeetingRequest);

// // Remove meeting request from the group
router
  .route("/group/removeMeetingRequest/:groupId&:meetingRequestId")
  .post(groupController.removeMeetingRequest);

///// MeetingRequest routes ////

// Create a meeting request
router.route("/meetingRequests/").post(meetingRequestController.create);

// Delete a meeting request
router
  .route("/meetingRequest/delete/:meetingRequestId")
  .delete(meetingRequestController.delete);

// Get all data about the meeting request
router
  .route("/meetingRequest/:meetingRequestId")
  .get(meetingRequestController.view);

// Update meeting name
router
  .route("/meetingRequest/rename/:meetingRequestId&:name")
  .post(meetingRequestController.rename);

// Update request type
router
  .route(
    "/meetingRequest/updateRequestType/:meetingRequestId&:isUnanimousMeetingRequest"
  )
  .post(meetingRequestController.updateRequestType);

// Add specified options to the meeting request options
router
  .route(
    "/meetingRequest/addRequestedOptions/:meetingRequestId&:requestedOptions"
  )
  .post(meetingRequestController.addRequestedOptions);

// Remove specified options from the meeting request
router
  .route(
    "/meetingRequest/removeRequestedOptions/:meetingRequestId&:requestedOptions"
  )
  .post(meetingRequestController.removeRequestedOptions);

// Update request status
router
  .route("/meetingRequest/updateRequestStatus/:meetingRequestId&:status")
  .post(meetingRequestController.updateRequestStatus);

///// Option routes ////

// Create an Option
router.route("/options/").post(optionController.create);

// Delete an Option
router.route("/option/delete/:optionId").delete(optionController.delete);

// View an Option
router.route("/option/:optionId").get(optionController.view);

// Update start time
router
  .route("/option/updateStart/:optionId&:start")
  .post(optionController.updateStart);

// Update end time
router
  .route("/option/updateEnd/:optionId&:end")
  .post(optionController.updateEnd);

// Add a vote
router
  .route("/option/addVote/:optionId&:userId&:groupId")
  .post(optionController.addVote);

// Remove a vote
router
  .route("/option/removeVote/:optionId&:userId&:groupId")
  .post(optionController.removeVote);

//// Meeting paths ////

// Create a meeting
router.route("/meeting/create").post(meetingController.create);

// View, update, and delete a meeting
router
  .route("/meeting/:meetingId")
  .get(meetingController.view)
  .delete(meetingController.delete)
  .patch(meetingController.update);

// Export API routes
module.exports = router;
