//require dependencies
const express = require('express') //it is inside the node_modules file

//initialize the express application
const app = express();

//configure settings
require('dotenv').config(); //require and call .config() before accessing .env variables

console.log(process.env)

const port = process.env.PORT; //PORT is an environment variable

//configure database
const fruits = ['apple', 'banana', 'pear'];

//mount middleware

//mount routes

//INDUCES - a way to remember the proper ordering of our routes

//index - GET /fruits
app.get('/fruits', function(req, res) {
    res.send(fruits); //this is an express method
})

//show - GET /fruits/:someUniqueIdentifier
app.get('/fruits/:index', function(req, res){
    const fruit = fruits[req.params.index];
    res.send(fruit);
})

//tell the app to listen on a dedicated port for requests
app.listen(port, function(){
    console.log(`Express is listening on port ${port} `); //a callback function which will be invoked when app.listen runs
});