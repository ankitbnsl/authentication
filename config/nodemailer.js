const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path=require('path');
// const env= require('./enviroment')
let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.user, 
    pass: process.env.pass, 
  }
});


  module.exports={ transporter : transporter  }