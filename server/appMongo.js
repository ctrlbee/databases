var express = require('express');
var db = require('./db');
var mongo = require('mongodb'); 

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
//var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set("port", 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// Set up our routes
//app.use("/classes", router);

// Serve the client files
app.use(express.static(__dirname + "/../client"));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}

///////////////////////////////////////////////////
////////////////MONGO PLAYGROUND///////////////////
///////////////////////////////////////////////////

var server = new mongo.Server("127.0.0.1", 27017, {}); 

var client = new mongo.Db('test2', server); 

var document = {name: "Mick Boogie", password: "24601"};


client.open(function(err, p_client){
 console.log("connected!")
  client.createCollection("demo", function(err, collection){
    console.log("collection created")
      collection.insert(document, function(err, results){
        console.log("inserted doc")
        client.close(); 
      });
  })
})


//app.use(init); 


app.get("/mongo", function (req, res) {
  res.send("req received"); 
})


