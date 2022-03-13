var mongoose= require('mongoose');
// const env = require('./enviroment')
console.log("db",process.env.database)
mongoose.connect(process.env.database,  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }); 

var db= mongoose.connection;

db.on('error',console.error.bind(console,'error'));

db.once('open',function(){
    console.log("connection sucessfull");
})

module.exports=db;