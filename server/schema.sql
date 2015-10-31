CREATE DATABASE chat;

USE chat;

CREATE TABLE rooms (
  /* Describe your table here.*/
  id int NOT NULL AUTO_INCREMENT,
  roomname varchar(50),
  PRIMARY KEY (id)
);

CREATE TABLE users (
  /* Describe your table here.*/
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50),
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  id int NOT NULL AUTO_INCREMENT,
  text varchar(140),
  created_at datetime,
  users_id int, 
  room_id int,
  FOREIGN KEY (users_id)
    REFERENCES users(id),
  FOREIGN KEY (room_id)
    REFERENCES rooms(id),  
  PRIMARY KEY (id)
);

/* Create other tables and define schemas for them here! */

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

