CREATE DATABASE spark;

CREATE TABLE user_spark(
  user_id INT,
  firstName VARCHAR(255) NOT NULL,
  lastName  VARCHAR(255) NOT NULL,
  birthday DATE NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  team_id VARCHAR(255),
  PRIMARY KEY(user_id),
  CONSTRAINT fk_teamId
      FOREIGN KEY(team_id) 
	  REFERENCES team(team_id)
);


CREATE TABLE team(
  team_id VARCHAR(255) ,
  team_name VARCHAR(255) NOT NULL,
  PRIMARY KEY(team_id)
);

