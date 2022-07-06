const express= require('express');
const controller=require('../Controllers/meeting.controller')
const router=express.Router();

router.get('/',controller.getAllTheMeetings);
router.get('/:id',controller.getMeetingById);
router.post('/',controller.addMeeting);
router.put('/:id',controller.updateMeeting);
router.delete('/:id',controller.deleteMeeting);

module.exports=router;