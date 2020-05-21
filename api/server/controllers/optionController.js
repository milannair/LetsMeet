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

// Update option label
exports.updateLabel = function(req, res) {
    MeetingRequest.updateOne({_id : req.params.optionId}, 
        {
            label: req.params.label
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
            votes: req.params.votes
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