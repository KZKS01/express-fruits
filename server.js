//require dependencies
const express = require('express') //it is inside the node_modules file

//initialize the express application
const app = express();

//configure settings
require('dotenv').config(); //require and call .config() before accessing .env variables

console.log(process.env)

const port = process.env.PORT; //PORT is an environment variable

//configure database
const fruits = require('./models/fruits'); //tells it the file path
console.log(fruits);

//mount middleware

//mount routes

//INDUCES - a way to remember the proper ordering of our routes

//index - GET /fruits
app.get('/fruits', function(req, res) {
    const readyToEat = req.query.readyToEat;
    console.log(readyToEat);
    if(readyToEat) {
        const filteredFruits = fruits.filter(function(f){
            return f.readyToEat === (readyToEat === 'true') //true or false
        });
        res.send(filteredFruits);
    } else {
        res.send(fruits);
    }
    res.send(fruits); //this is an express method
})

//show - GET /fruits/:someUniqueIdentifier
app.get('/fruits/:index', function(req, res){
    const fruit = fruits[req.params.index];
    res.render('show.ejs', {fruit: fruit});//invokes the function of the view engine, look into ejs files and turn it into html in the browser
}); //1st fruit is key; 2nd fruit is value, it represents line 41; the name fruit is just to be more descriptive
//{fruitInfo: fruit} is the data that it is passing, object allows us to hold collections of value

//tell the app to listen on a dedicated port for requests
app.listen(port, function(){
    console.log(`Express is listening on port ${port} `); //a callback function which will be invoked when app.listen runs
});