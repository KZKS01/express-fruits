//require dependencies
const express = require('express'); //it is inside the node_modules file
const methodOverride = require('method-override');

//initialize the express application
const app = express();

//configure settings
require('dotenv').config(); //require and call .config() before accessing .env variables

console.log(process.env)

const port = process.env.PORT; //PORT is an environment variable

//configure database
const fruits = require('./models/fruits'); //tells it the file path
console.log(fruits);

//mount middleware - special functions that perform a service on a request

/* 
1) reading info from a request
2) modifying info from a request
3) process data from a form submission
*/

//does the form data need to be encoded? more info: https://expressjs.com/en/api.html#express
app.use(express.urlencoded({extended: false})) //.use() is used to plug in middleware function
//gives us access to a special object called req.body
//req.body is used to gather form input, anytime an input is submitted, it becomes req.body


app.use(methodOverride('_method')); //invoking the methodOverride method
//this takes a special query parameter
//this way it knows which request needs to be overridden(in this case, any method that includes'_method')

app.use(express.static('public')); //static middleware takes the line 9 in index.ejs go into "public" folder

//mount routes

//INDUCES - a way to remember the proper ordering of our routes

app.get('/', function(req, res){
    res.redirect('/fruits');  //automatically goes to the fruit link
});


//index - GET /fruits
app.get('/fruits', function(req, res) {
    const readyToEat = req.query.readyToEat;
    console.log(readyToEat);
    if(readyToEat) { //if query param(readyToEat) exists, then run
        const filteredFruits = fruits.filter(function(f){ //filter the fruit array
            return f.readyToEat === (readyToEat === 'true') //true or false
        });
        res.render('index.ejs', {fruits: filteredFruits});
    } else {
        res.render('index.ejs', {fruits: fruits});
    }
});

//new - GET /fruits/new - send the user to a page with a form where thy can add a new fruit
app.get('/fruits/new', function(req, res){
    res.render('new.ejs');
})

//delete - DELETE request /fruits/:indexOfruitsArray
app.delete('/fruits/:indexOfFruitsArray', function(req, res){
    fruits.splice(req.params.indexOfFruitsArray, 1)//can take up to three args
    res.redirect('/fruits');
});


//update = PUT /fruits/:indexOfFruitsArray
app.put('/fruits/:indexOfFruitsArray', function(req, res){
    //change readyToEat property to boolean
    if(req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
//set the fruit object to updated version in array
    fruits[req.params.indexOfFruitsArray] = req.body; 
    //redirect user to the fruits index
    res.redirect('/fruits');

})


//create - POST /fruits - take form data and create a new fruit with it
app.post('/fruits', function(req, res){
    console.log(req.body);
    // if(req.body.readyToEat === 'on') {
    //     req.body.readyToEat = true;
    // } else {
    //     req.body.readyToEat = false;
    // }

    //it coerce whatever into a boolean value: !!undefine = false
    req.body.readyToEat = !!req.body.readyToEat;

    fruits.push(req.body);
    res.redirect('/fruits')//tells the browser to make a GET request to /fruits);
})

//edit - GET /fruits/:indexOfFruitsArray/edit - sending a page that allows a user to edit a fruit
app.get('/fruits/:indexOfFruitsArray/edit', function(req, res){  //original line 89
    //1) find the fruit we need to edit
    res.render('edit.ejs', {
        fruit: fruits[req.params.indexOfFruitsArray],
        index: req.params.indexOfFruitsArray  //original line 93
    });
    //2) include the fruit to edit inside the edit.ejs template
    
    //3) include the index of the fruit we're editing
    
    //3.1) this way we'll be able to make the update afterwards

});

//show - GET /fruits/:someUniqueIdentifier
// :index can be referenced to in this file, but cannot do in index.ejs line 16
app.get('/fruits/:index', function(req, res){
    const fruit = fruits[req.params.index]; //original line 41
    res.render('show.ejs', {fruit: fruit});//invokes the function of the view engine, look into ejs files and turn it into html in the browser
}); //1st fruit is key; 2nd fruit is value, it represents line 41; the name fruit is just to be more descriptive
//{fruitInfo: fruit} is the data that it is passing, object allows us to hold collections of value


//tell the app to listen on a dedicated port for requests
app.listen(port, function(){
    console.log(`Express is listening on port ${port} `); //a callback function which will be invoked when app.listen runs
});

