var db = require('../db'); /// ???

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (username, cb) {
      db.connect();
      db.query("SELECT username FROM users WHERE username='" + username +"';", function(err, rows, fields) {
        cb(err, rows);
      });      
      db.end();
    },
    post: function (username, cb) {
      db.connect(); 
      db.query("INSERT INTO users (username) values ('" +username+ "');", function(err, rows, fields) {
        cb(err, rows);
      })
      db.end(); 
    }
  }
};

