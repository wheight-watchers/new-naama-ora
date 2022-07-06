const MeetingService = require('../Services/meeting.service');


module.exports.getAllTheMeetings = async function (req, res, next) {
    try {
        const { businessId  } = req.query;
        const meetings = await MeetingService.getAllTheMeetings(businessId );
        res.send(meetings)
    }
    catch (error) {
        next(error)
    }
}


module.exports.getMeetingById = async function (req, res, nex) {
    try {
        const {id}=req.params
        const meeting = await MeetingService.getMeetingById(id);
        res.send(meeting)
    }
    catch (error) {
        next(error)
    }
}

module.exports.addMeeting = async function (req, res, next) {
  
    const { businessId, startTime, duration, meeting } = req.body;
    try {
        const insertMeeting = await MeetingService.addMeeting(businessId, startTime, duration, meeting);
        res.send(insertMeeting)
    }
    catch (error) {
        
        next(error)
    }
}


module.exports.updateMeeting=async function(req,res,next){
    try{
        const { meeting } = req.body;
        const { id } = req.params;
        const updatedMeeting=await MeetingService.updateMeeting(id,meeting);
        res.send(updatedMeeting)
    }
    catch(error){
        next(error)
    }
}


module.exports.deleteMeeting=async function(req,res,next){
    try{
        const { id } = req.params;
        const deletedMeeting=await MeetingService.deleteMeeting(id);
        res.send(deletedMeeting)
    }
    catch{
        next(error)
    }
}















