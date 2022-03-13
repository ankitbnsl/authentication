var mongoose= require('mongoose');
const path =require('path');

const user_schema = mongoose.Schema({
  name:{type:String , required: true} ,
    email:{type:String , required:true },
    password:{type:String , required:true },
} , {timestamps:true} );


const User = mongoose.model('user',user_schema);
module.exports= User;