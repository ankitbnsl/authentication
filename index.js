const express= require('express');
const port=3000;
const app= express();
const expressLayout= require('express-ejs-layouts');
require('dotenv').config();


const session=require('express-session');
const passport= require('passport');

const connectflash= require('connect-flash');
const flashmiddleware = require('./config/flashmiddleware');


const passportlocal = require('./config/passport_local_strategy');

app.use(expressLayout);

app.set('layout extractStyles',true);   app.set('layout extractScript',true);


app.use(express.urlencoded());

app.set('view engine','ejs');
app.set('views', './views');

app.use(express.static('assets'));

// //passport encryption section

const MongoStore = require('connect-mongo');
const passportGoogle=require('./config/passport-google-oauth2-strategy');


app.use(session({
      name:'auth-system',
      secret:process.env.session_cookie_key,
      resave: false,
      saveUninitialized: false,
      cookie:{maxAge:(1000*60*100)} ,
      store: MongoStore.create( {mongoUrl: process.env.database, autoRemove:'disabled'},
              function(err){  if(err){console.log("error");} }       )
      }));


app.use(passport.initialize());app.use(passport.session());
app.use(passport.setAuthenticateduser); 

app.use(connectflash());
app.use(flashmiddleware.setflash);

app.use('/',require('./routes/index'));

const db= require('./config/mongoose');

console.log(process.env.port +" "+ process.env.value +" hello"+process.env.smtp);

app.listen(port,function(req,res){
      console.log(`server is running at port ${port}`);
});
