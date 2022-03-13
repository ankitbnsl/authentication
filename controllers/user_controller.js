const User =require('../models/user_model');
const passport=require('passport')

const path=require('path');
const fs= require('fs');
const jwt = require('jsonwebtoken');


module.exports.profile = function(req,res){
  
  return res.render('profile');    
}
      
module.exports.signin=function(req,res){
  if(req.isAuthenticated()){return res.redirect('/users/profile');}
  else{ return res.render('signin');}

}

module.exports.signup=function(req,res){
  if(req.isAuthenticated()){return res.redirect('/users/profile');}
  else{ return res.render('signup');}

  // return res.render('signup');
}

// sign up i.e create new user
module.exports.create=function(req,res){
  console.log("called",req.body);
    if(req.body.password == req.body.confirmpassword){
       
        User.findOne({email:req.body.email},function(err,user){
          if(err){console.log("Error in finding and signing up"); return;}
            
          if(!user){

            User.create(req.body,function(err,user){
              if(err){console.log("creating user error"); return;}
              req.flash('success','Account created successfully');
              return res.redirect('/users/sign-in');
            });

          } else{ return res.redirect('back');}
            
        });

    }
    else{ 
      req.flash('error','Password Not matched');
      console.log("not match");
      return res.redirect('back');
    }

}


module.exports.createToken= function(req,res){
  req.flash('success','Logged in successfully');
  console.log(req.user);
  return res.redirect('/users/profile');
  // return res.render('profile',{})
}

module.exports.destroySession = function(req, res){
  req.logout();
  req.flash('success','you have logged out');
  return res.redirect('/users/sign-in');
  } 


module.exports.forgot= function(req,res){
  return res.render('forgot');
}

module.exports.reset=function(req,res){
    // console.log(req.)
  User.findOne({email:req.params.email},function(err,user){
    if(err){ return res.send("error in fetching user details");}   
    if(!user){ return res.send("Invalid request - no such user ");}

    jwt.verify(req.params.token,process.env.jwt_secret, (err, decoded) => { 
            if(err){ return res.send("Token not verified");}
             
            return res.render('reset',{email:req.params.email});
           } );
  });
}

module.exports.resetpassword=function(req,res){
  User.findOne({email:req.body.email},function(err,user){
    if(err){ return res.send("error in fetching user details");}   
    
    if (req.body.password != req.body.confirmpassword){
      console.log("password not match");  
      return res.redirect('back');      
      }

    user.password = req.body.password;
    user.save();
    return res.render('signin')

  });
}