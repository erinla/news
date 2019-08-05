//Require dependencies
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
//Set up port
var PORT = process.env.PORT || 3001;

var app = express();

//Set up Express router
var router = express.Router();

// Require our routes file pass our router object
require("./config/routes")(router);

//Designate public folder as a static directory
app.use(express.static(__dirname + "/public"));

//Connect Handlebars to Express
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//use body parser
app.use(bodyParser.urlencoded({
    extended: false
}));

//Middleware
app.use(router);

//If deployed, use deployed database. Otherwise, use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//Connect mongoose to our database
mongoose.connect(db, function (error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("mongoose connection is successful");
    }
});

//Listen
app.listen(PORT, function () {
    console.log("Listening on port: " + PORT);
});



