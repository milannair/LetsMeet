Option = require('../models/optionModel')

exports.create = function(req, res) {
    let option = new Option();
    option.time = req.params.time;
    option.votes = req.params.votes;
    option.label = req.params.label;
    
    option.dispatchEvent(function(err) {
        if(err) {
            res.json({
                status: 500,
                erroMessage: err.message,
                errorName: err.name,
            })
        }
        res.json({
            status: res.statusCode,
            message: "Option created successfully",
            option: option,
        })
    })
}

// Update option start time
exports.updateStart = function(req, res) {
    MeetingRequest.updateOne({_id : req.params.optionId}, 
        {
            start: req.params.start
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

// Update option end time
exports.updateStart = function(req, res) {
    MeetingRequest.updateOne({_id : req.params.optionId}, 
        {
            end: req.params.end
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

// Update option votes
exports.updateVotes = function(req, res) {
    MeetingRequest.updateOne({_id : req.params.optionId}, 
        {
            $push : {votes: req.params.vote}
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