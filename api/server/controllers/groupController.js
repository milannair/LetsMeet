Group = require("../models/groupModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var socket = require('../../server');

// Creates a new group
exports.create = function(req, res) {
    try {
        jwt.verify(req.params.auth_token, process.env.ACCESS_TOKEN);
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
    let group = new Group()
    group.meetingRequests = req.body.meetingRequests ? req.body.meetingRequests : []
    group.memberRequests = req.body.memberRequests ? req.body.memberRequests : []
    group.members = req.body.members ? req.body.members : []
    group.owner = req.body.owner
    group.name = req.body.name
    group.save(function(err){
        if(err) {
            res.json({
                status: 500,
                erroMessage: err.message,
                errorName: err.name,
            })
        }
        res.json({
            status: res.statusCode,
            message: "Group created successfully",
            data: {_id : group._id}
        })
    })
}

// Delete a group
exports.delete = function(req, res) {
    try {
        jwt.verify(req.params.auth_token, process.env.ACCESS_TOKEN);
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
    Group.findByIdAndRemove(req.body.id , function(err, data){
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

// Gets all the data about the group
exports.view = function(req, res) {
    try {
        jwt.verify(req.params.auth_token, process.env.ACCESS_TOKEN);
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
    Group.findById(req.params.groupId, function(err, data){
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

// Gets the group's name and id
exports.name = function(req, res) {
    try {
        jwt.verify(req.params.auth_token, process.env.ACCESS_TOKEN);
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
    Group.findById(req.params.groupId, {name: 1}, function(err, data){
        if(err) {
            res.json({
                status: 500,
                erroMessage :err.message,
                errorName: err.name
            })
        } else {
            res.json({
                status: res.statusCode,
                data: data,
                message: "Hello"
            })
        }
    });    
}


// Receives a groupId and a string and updates the group's name to the passed string
exports.rename = function(req, res) {
    try {
        jwt.verify(req.params.auth_token, process.env.ACCESS_TOKEN);
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
    Group.update(
        {_id: req.body.groupId},
        {
            name: req.body.name
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
    });
}

// Receives the groupId and the userID as input
// Adds the userId to the list of group members
exports.addMember = function(req, res) {
    try {
        jwt.verify(req.params.auth_token, process.env.ACCESS_TOKEN);
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
    Group.update(
        {_id: req.body.groupId},
        {
            $push: {members : req.body.userId}
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
    });
}


// Receives the groupId and the userID as input
// Removes the userId from the list of group members
exports.removeMember = function(req, res) {
    try {
        jwt.verify(req.params.auth_token, process.env.ACCESS_TOKEN);
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
    Group.update(
        {_id: req.params.groupId},
        {
            $pull: {members : req.params.userId}
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
    });
}


// Receives the groupId and the userID as input
// Adds the userId to the list of group's member requests
exports.addMemberRequest = function(req, res) {
    try {
        jwt.verify(req.params.auth_token, process.env.ACCESS_TOKEN);
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
    Group.update(
        {_id: req.body.groupId},
        {
            $push: {memberRequests : req.body.userId}
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
    });
}


// Receives the groupId and the userID as input
// Removes the userId from the list of group's member requests
exports.removeMemberRequest = function(req, res) {
    try {
        jwt.verify(req.params.auth_token, process.env.ACCESS_TOKEN);
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
    Group.update(
        {_id: req.body.groupId},
        {
            $pull: {memberRequests : req.body.userId}
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
    });
}


// Receives the groupId and the meetingRequestId as input
// Adds the meetingRequestId from the list of group's meeting requests
exports.addMeetingRequest = function(req, res) {
    try {
        jwt.verify(req.params.auth_token, process.env.ACCESS_TOKEN);
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
    Group.update(
        {_id: req.body.groupId},
        {
            $push: {meetingRequests : req.body.meetingRequestId}
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
            socket.io.in(req.body.groupId).emit('add meeting request', req.body.meetingRequestId);
        }
    });
}


// Receives the groupId and the meetingRequestId as input
// Removes the meetingRequestId from the list of group's meeting requests
exports.removeMeetingRequest = function(req, res) {
    try {
        jwt.verify(req.params.auth_token, process.env.ACCESS_TOKEN);
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
    Group.update(
        {_id: req.params.groupId},
        {
            $pull: {meetingRequests : req.params.meetingRequestId}
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
            socket.io.in(req.body.groupId).emit('remove meeting request');
        }
    });
}