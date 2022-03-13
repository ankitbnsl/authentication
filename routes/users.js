const express= require('express');
const router = express.Router();
const usercontroller= require('../controllers/user_controller');
const passport=require('passport');
const forgotmailer = require('../mailers/forgotmailer');

router.get('/profile',passport.checkAuthentication,usercontroller.profile);
router.get('/sign-up', usercontroller.signup);
router.get('/sign-in', usercontroller.signin);
router.post('/sign-up/create', usercontroller.create);
router.post('/sign-in/createToken', passport.authenticate('local', {failureRedirect:'/users/sign-in'}) ,usercontroller.createToken);
router.get('/sign-out',usercontroller.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'users/sign-in'}),usercontroller.createToken);

router.get('/forgot', usercontroller.forgot);
router.post('/forgot/submit', forgotmailer.sendMail);

router.get('/sign-in', usercontroller.signin);
router.post('/sign-up/create', usercontroller.create);

router.get('/reset/:email/:token',usercontroller.reset);
router.post('/reset/reset-password',usercontroller.resetpassword);
module.exports=router;  