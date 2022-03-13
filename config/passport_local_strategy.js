const passport=require('passport')
const localStrategy=require('passport-local').Strategy;

const User=require('../models/user_model');

// authentication using passport
passport.use(new localStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    function(req, email, password, done){
    // find a user and establish the identity
    User.findOne({email: email}, function(err, user) {
    if (err){
    req.flash('error', err);
    return done(err);
    }
    
    if (!user || user.password != password){
        
    req.flash('error', 'Invalid Username/Password');
    return done(null, false);
    }
    
    
    return done(null, user);
    });
    }
    
    ));
    

// store the user which is login
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// find the user which is log in
passport.deserializeUser(function(id,done){

User.findById(id,function(err,user){
       if(err){console.log("error in finding user"); return done(err);}
       console.log("found user desrializer");
         return done(null,user);
});

});
// to check authentication while accessing profile page
passport.checkAuthentication= function(req,res,next){

    if(req.isAuthenticated()){return next();}
    else{ return res.redirect('/users/sign-in');}
}

// copy the user in locals if the user is log in
passport.setAuthenticateduser= function(req,res,next){
    if(req.isAuthenticated()){console.log(" Authenticated user "); res.locals.user= req.user;}
      next();
}

module.exports=passport;