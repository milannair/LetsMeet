MeetingRequest = require('../models/meetingRequestModel')

// Create a new meeting request
exports.create = function(req, res) {
    console.log("got here 2")
    let meetingRequest = new MeetingRequest();
    meetingRequest.author = req.body.author;
    meetingRequest.groupId = req.body.groupId;
    meetingRequest.name = req.body.name ? req.body.name : 'Meeting';
    meetingRequest.isUnanimousMeetingRequest = req.body.isUnanimousMeetingRequest;
    meetingRequest.requestedOptions = req.body.requestedOptions;
    meetingRequest.deadline = req.body.deadline;
    meetingRequest.status = req.body.status;

    meetingRequest.save(function(err){
        if(err) {
            res.json({
                status: 500,
                erroMessage: err.message,
                errorName: err.name,
            })
        }
        res.json({
            status: res.statusCode,
            message: "Meeting Request created successfully",
            data: meetingRequest
        })
    })
}

// Delete a Meeting Request
exports.delete = function(req, res) {
    MeetingRequest.findByIdAndRemove(req.params.meetingRequestId , function(err, data){
        if(err) {
            res.json({
                status: 500,
                erroMessage :err.message,
                errorName: err.name
            })
        } else {
            res.json({
                status: res.statusCode,
                data: data
            })
        }
    });    
}

// Gets all the data about the meeting request
exports.view = function(req, res) {
    MeetingRequest.findById(req.params.meetingRequestId, function(err, data){
        if(err) {
            res.json({
                status: 500,
                erroMessage :err.message,
                errorName: err.name
            })
        } else {
            res.json({
                status: res.statusCode,
                data: data
            })
        }
    });    
}

// Update meeting name
exports.rename = function(req, res) {
    MeetingRequest.updateOne({_id : req.params.meetingRequestId}, 
        {
            name: req.params.name
        }, 
        function(err, data) {
        if(err) {
            res.json({
                status: 500,
                erroMessage :err.message,
                errorName: err.name
            })
        } else {
            res.json({
                status: res.statusCode,
                data: data
            })
        }
    })
}

// Update poll type
exports.updateRequestType = function(req, res) {
    MeetingRequest.updateOne({_id : req.params.isUnanimousMeetingRequest}, 
        {
            isUnanimousMeetingRequest: req.params.isUnanimousMeetingRequest
        }, 
        function(err, data) {
        if(err) {
            res.json({
                status: 500,
                erroMessage :err.message,
                errorName: err.name
            })
        } else {
            res.json({
                status: res.statusCode,
                data: data
            })
        }
    })
}

// Receives an array of options and adds them 
// to the existing array of requested times
exports.addRequestedOptions = function(req, res) {
    MeetingRequest.updateOne({_id : req.params.meetingRequestId}, 
        {
           $push: {requestedTimes: {$each: req.params.requestedOptions}}
        }, 
        function(err, data) {
        if(err) {
            res.json({
                status: 500,
                erroMessage :err.message,
                errorName: err.name
            })
        } else {
            res.json({
                status: res.statusCode,
                data: data
            })
        }
    })
}

// Receives an array of new requested times and removes them 
// from the existing array of requested times
exports.removeRequestedOptions = function(req, res) {
    MeetingRequest.updateOne({_id : req.params.meetingRequestId}, 
        {
           $pull: {requestedOptions: {$each: req.params.requestedOptions}}
        }, 
        function(err, data) {
        if(err) {
            res.json({
                status: 500,
                erroMessage :err.message,
                errorName: err.name
            })
        } else {
            res.json({
                status: res.statusCode,
                data: data
            })
        }
    })
}

// Update request status in the meeting request
exports.updateRequestStatus = function(req, res) {
    MeetingRequest.updateOne({_id : req.params.meetingRequestId}, 
        {
            status: req.params.status
        }, 
        function(err, data) {
        if(err) {
            res.json({
                status: 500,
                erroMessage :err.message,
                errorName: err.name
            })
        } else {
            res.json({
                status: res.statusCode,
                data: data
            })
        }
    })
}