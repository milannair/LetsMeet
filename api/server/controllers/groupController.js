Group = require("../models/groupModel")


// Create a new group
exports.create = function(req, res) {
    console.log(req.body)
    let group = new Group()
    group.meetingRequests = req.body.meetingRequests ? req.body.meetingRequests : []
    group.memberRequests = req.body.memberRequests ? req.body.memberRequests : []
    group.members = req.body.members ? req.body.members : []
    group.owner = req.body.owner
    group.save(function(err){
        if(err) {
            res.json({
                satus: 500,
                erroMessage: err.message,
                errorName: err.name,
            })
        }
        res.json({
            satusCode: 200,
            message: "Group created successfully",
            data: group
        })
    })
}