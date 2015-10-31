var models = require('../models');
var url = require('url'); 

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function (err,data){
        sendResponse(res, err, data); 
      })
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var postBody = req.body; 
      models.messages.post(postBody, function (err, data){
        sendResponse(res, err, 201);
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      var parsed = url.parse(req.url, true);
      //console.log(parsed);
      models.users.get(parsed.query.username, function (err, data) {
        sendResponse(res, err, data);
      });
    },
    post: function (req, res) {
      var postBody = req.body.username; 
      // console.log(req.body); 
      // console.log(postBody); 
      models.users.post(postBody, function (err, data){
        sendResponse(res, err, 201);
      });
    }
  }
};



function sendResponse(res, err, userData) {
  if (err) {
    console.log("OH N0 " + err);
  } else {
    console.log(userData);
    res.send(userData);
  }
};

