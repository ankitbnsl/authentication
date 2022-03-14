To run this project first create .env file
contents of .env file =>
session_cookie_key = 
database=mongodb://localhost/auth-system
user=  
pass= 
clientID = 
clientSecret=
callbackURL=http://localhost:3000/users/auth/google/callback
jwt_secret = 
session cokiee can be any random value , user is name of gmail account , pass is password of that account , obtain clientid ,secret from google developer console , jwt_secret can have any value that is used to create random tokens
After creating .env
npm install 
nodemon index.js
Now project is up and running successfully
