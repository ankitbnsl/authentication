const passport=require('passport');
const googlestrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user_model');

passport.use(new googlestrategy({
    clientID:process.env.clientID,
    clientSecret:process.env.clientSecret,
    callbackURL:process.env.callbackURL 
},
function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){ console.log("Error in google strategy-passport",err);return;}
        // console.log(profile);
        if(user){
            return done(null,user);
        }else{
            User.create({
                name:profile.displayName , email:profile.emails[0].value,password:crypto.randomBytes(20).toString('hex')
            },function(err,user){

             if(err){ console.log("Error in creating user google strategy-passport",err);return;}
             return done(null,user);

            });

        }
    
     });
}

));