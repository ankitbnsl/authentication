const nodemailer= require('../config/nodemailer');
const User= require('../models/user_model');
const jwt = require('jsonwebtoken');
// const env= require('../config/enviroment')
module.exports.sendMail= function(req,res){
    console.log("comment mailer",req.body.email);

    User.findOne({email:req.body.email},function(err,user){
             if(err || !user){ req.flash('error','No user found with this mail');   return res.redirect('back');}

            var token = jwt.sign(user.toJSON(),process.env.jwt_secret, {expiresIn: '2m'});
           

    nodemailer.transporter.sendMail({
        to: req.body.email,
        subject: "Reset",
        html:` <h1>Reset with this link </h1> <p> <a href="http://localhost:3000/users/reset/${user.email}/${token}"> click here </a> </p>`
        
    }, function(err, info){ 
        if(err){ console.log("error in sending mail"); 
         req.flash('error','Error in sending mail'); 
          return res.redirect('back');
         }

        console.log("message sent"); 
        req.flash('success','Forgot link sent successfully');
        return res.redirect('/users/sign-in');
    });
    });

}