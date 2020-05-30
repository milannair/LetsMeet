Option = require('../models/optionModel')

// Create an option
exports.create = function(req, res) {
    console.log('In the controller')
    let option = new Option();
    option.time = {start : req.body.start, end: req.body.end}
    option.votes = req.params.votes;
    
    option.save(function(err) {
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
            data: option,
        })
    })
}

// Delete a Meeting Request
exports.delete = function(req, res) {
    Option.findByIdAndRemove(req.params.optionId , function(err, data){
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

// Gets all the data in the option
exports.view = function(req, res) {
    Option.findById(req.params.optionId, function(err, data){
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

// Update option start time
exports.updateStart = function(req, res) {
    Option.updateOne({_id : req.params.optionId}, 
        {
            $set : {'time.start' : req.params.start}
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
exports.updateEnd = function(req, res) {
    Option.updateOne({_id : req.params.optionId}, 
        {
            $set : {'time.end' : req.params.end}
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

// Add a vote
exports.addVote = function(req, res) {
    Option.updateOne({_id : req.params.optionId}, 
        {
            $push : {votes: req.params.userId}
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

// Remove a vote
exports.removeVote = function(req, res) {
    Option.updateOne({_id : req.params.optionId}, 
        {
            $pull : {votes: req.params.userId}
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