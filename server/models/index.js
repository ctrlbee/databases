var db = require('../db/index.js'); 
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function (cb) {
      db.query("SELECT m.text, r.roomname, u.username FROM messages m inner JOIN rooms r on r.id=m.room_id inner JOIN users u on u.id=m.users_id", function(err, rows, fields){
        console.log(rows, 'THESE ARE OUR ROWS')
        cb(err, rows); 
      });
    }, 
    post: function (message, cb) {
      var promises = [
        lookupUser(message.username),
        lookupRoom(message.roomname)
        ];

      return Promise.all(promises) 
        .then(function(dataArray) {
          console.log(dataArray);
          var user_id = dataArray[0][0].id;
          var room_id = dataArray[1][0].id;

          db.query("INSERT INTO messages (users_id, room_id, text) values ('"+user_id+"','"+ room_id+"','"+ message.message +"');", function(err, rows, fields) {
            cb(err, rows);
          });
        });

    } 
  },

  users: {
    // Ditto as above.
    get: function (username, cb) {
      db.query("SELECT username FROM users WHERE username='" + username +"';", function(err, rows, fields) {
        cb(err, rows);
      });      
    },
    post: function (username, cb) { 
      db.query("INSERT INTO users (username) values ('" +username+ "');", function(err, rows, fields) {
        cb(err, rows);
      })
    }
  }
};

var lookupUser = function(username){
  return new Promise(function (resolve, reject){
    db.query("SELECT id FROM users WHERE username='" + username +"';", function (err, rows, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  })
}

var lookupRoom = function(room) {
  return new Promise(function (resolve, reject){
    db.query("SELECT id FROM rooms WHERE roomname='" + room +"';", function (err, rows, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  })
}


var lookupAsync = Promise.promisify(db.query);


