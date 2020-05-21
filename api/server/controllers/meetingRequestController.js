MeetingRequest = require('../models/meetingRequestModel')

// Create a new meeting request
exports.create = function(req, res) {
    let meetingRequest = new MeetingRequest();
    meetingRequest.author = req.params.author;
    meetingRequest.deadline = req.params.deadline;
    meetingRequest.groupId = req.params.groupId;
    meetingRequest.multiPoll = req.params.multipoll ? req.params.multipoll : [];
    meetingRequest.uniPoll = req.params.uniPoll;
    meetingRequest.staus = req.params.status;
    meetingRequest.isUniPoll = req.params.isUniPoll;
    meetingRequest.totalVotes = req.params.votes;
    meetingRequest.name = req.params.name ? req.params.name : 'Meeting';

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
    MeetingRequest.findByIdAndRemove(req.params.id , function(err, data){
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
    MeetingRequest.findById(req.params.groupId, function(err, data){
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

// Change meeting name
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

// Update multipoll meeting request options
exports.updateMultiPollOptions = function(req, res) {
    MeetingRequest.updateOne({_id : req.params.meetingRequestId}, 
        {
            multiPoll: req.params.multiPoll
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

// Update unipoll meeting request options
exports.updateMultiPollOptions = function(req, res) {
    MeetingRequest.updateOne({_id : req.params.meetingRequestId}, 
        {
            uniPoll: req.params.uniPoll
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

// 
exports.updatePollType = function(req, res) {
    MeetingRequest.updateOne({_id : req.params.meetingRequestId}, 
        {
            isUniPoll: req.params.isUniPoll
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




