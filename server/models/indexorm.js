var db = require('../db/indexorm.js');
var Sequelize = require('sequelize');
var Promise = require('bluebird'); 

var User = db.define('user', {
  username: {
    type: Sequelize.STRING
  }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

var Room = db.define('room', {
  roomname: {
    type: Sequelize.STRING
  }
}, {
    freezeTableName: true
}); 

var Message = db.define('message', {
  text: {
    type: Sequelize.STRING
  }, 
}, 
{
  freezeTableName: true
}); 

Room.hasMany(Message, {as : 'room_id'}); 
User.hasMany(Message, {as : 'user_id'}); 
Message.belongsTo(User);
Message.belongsTo(Room);


User.sync(); 
Room.sync(); 
Message.sync(); 

module.exports = {
  messages : {
    get : function() {
      return Message.findAll({
        include : [User]
      })
    },
    post : function(postBody){
        return User.findAll({
          where: { 'username': postBody.username}
        })
        .then(function(user){
          return Message.create({
              text: postBody.text,
              userId: user[0].dataValues.id 
          })
        })
    }
  },

  users : {
    get : function () {
      return User.findAll({})
    },
    post : function (username) {
      return User.create({
        username : username
      })
    }
  }

}

