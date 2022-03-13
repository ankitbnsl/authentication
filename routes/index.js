const express= require('express');
const router = express.Router();
console.log("routes is running");
const passport=require('passport')

router.get('/',function(req,res){res.render('signup')});
router.use('/users',require('./users'));

module.exports=router;