--Δημιουργία Βάσης Δεδομένων

CREATE DATABASE taxijoin;

--Δημιουργία Πίνακα Εγγεγραμμένων Χρηστών

CREATE TABLE users (

username VARCHAR(100) NOT NULL,
password VARCHAR(100) NOT NULL,
isAdmin BOOLEAN NOT NULL DEFAULT 0,
isDriver BOOLEAN NOT NULL DEFAULT 0,

PRIMARY KEY(username)

);

--Δημιουργία Λογαριασμού Διαχειριστή

INSERT INTO users
VALUES ('admin','admin',1,0);

CREATE TABLE connected (

username VARCHAR(100) NOT NULL,
isAdmin BOOLEAN NOT NULL DEFAULT 0,
isDriver BOOLEAN NOT NULL DEFAULT 0,

PRIMARY KEY(username)

);

CREATE TABLE requests(

creator VARCHAR(100) NOT NULL,
startlat DOUBLE(18,15) NOT NULL,
startlong DOUBLE(18,15) NOT NULL,
endlat DOUBLE(18,15) NOT NULL,
endlong DOUBLE(18,15) NOT NULL,
participants SMALLINT NOT NULL DEFAULT 1,

PRIMARY KEY(creator)

);
