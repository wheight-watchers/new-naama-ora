const dairyService= require('../Services/diary.service')
module.exports.getDiary=async function(req,res,next){
    try{
        const{userId}=req.params
        const allDiary=await dairyService.getDiary(userId);
        res.send(allDiary)
    }
    catch(error){
        next(error)
    }
}
module.exports.addDiary=async function(req,res,next){
    try{
        const {userId}=req.params;
        const{diary}=req.body
        const diaryAdded=await dairyService.addDiary(userId,diary);
        res.send(diaryAdded)
    }
    catch(error){
        next(error)
    }
}
module.exports.updateDiary=async function(req,res,next){
    try{
        const {userId}=req.params;
        const{date,summary}=req.body;
        const{dairyId}=req.query;
        const updateDairy=await dairyService.updateDiary(userId,dairyId,date,summary);
        res.send(updateDairy)
    }
    catch(error){
        next(error)
    }
}
module.exports.deleteDairy=async function(req,res,next){
    try{
        const {userId}=req.params;
        const{dairyId}=req.query;
        const updateDairy=await dairyService.deleteDairy(userId,dairyId);
        res.send(updateDairy)
    }
    catch(error){
        next(error)
    }
}