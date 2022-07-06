const express= require('express');
const controller=require('../Controllers/diary.controller')
const router=express.Router();

router.get('/:id/diary',controller.getDiary);
router.post('/:id/diary',controller.addDiary);
router.put('/:id/diary/:id',controller.updateDiary);
router.delete('/:id/diary/:id',controller.deleteDairy);

module.exports=router;