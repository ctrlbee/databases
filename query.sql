#select * from users;

#drop table users;
#drop table rooms; 
#drop table messages; 

-- 
-- CREATE TABLE rooms (
--   /* Describe your table here.*/
--   id int NOT NULL AUTO_INCREMENT,
--   roomname varchar(50),
--   PRIMARY KEY (id)
-- );
-- 
-- CREATE TABLE users (
--   /* Describe your table here.*/
--   id int NOT NULL AUTO_INCREMENT,
--   username varchar(50),
--   PRIMARY KEY (id)
-- );
-- 
-- CREATE TABLE messages (
--   id int NOT NULL AUTO_INCREMENT,
--   text varchar(140),
--   created_at datetime,
--   users_id int, 
--   room_id int,
--   FOREIGN KEY (users_id)
--     REFERENCES users(id),
--   FOREIGN KEY (room_id)
--     REFERENCES rooms(id),  
--   PRIMARY KEY (id)
-- );


#insert into messages (text, users_id, room_id) values ('hello there', 1, 1)

select * from messages inner join users on messages.users_id = users.id




