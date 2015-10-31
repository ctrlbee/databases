var models = require('../models/indexorm.js');
var url = require('url'); 

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get()
      .then(function (data){
        sendResponse(res, data); 
      })
      .catch(function(err){
        sendError(res, err); 
      })
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var postBody = req.body;
      models.messages.post(postBody)
        .then(function(data) {
          sendResponse(res, 201);
        })
        .catch(function(err) {
          sendError(res, err)
        })
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      //var parsed = url.parse(req.url, true);
      models.users.get()
      .then(function (data) {
        sendResponse(res, data);
      });
    },
    post: function (req, res) {
      var postBody = req.body.username;  
      models.users.post(postBody)
        .then(function(data) {
          sendResponse(res, 201);
        })
        .catch(function(err) {
          sendError(err);
        })
    }
  }
};



function sendResponse(res, userData) {
    res.send(userData);
};

function sendError(res, err) {
  res.status(404);
  res.send(err);
}
