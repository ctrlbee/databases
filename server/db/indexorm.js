var Sequelize = require('sequelize');

module.exports = new Sequelize('ormchat', 'root', 'password', {
  host: 'localhost', 
  dialect: 'mysql',
  port: 3306, 
  pool: {
    max: 10, 
    min: 0, 
    idle: 20000
  }
});