--Δημιουργία Βάσης Δεδομένων

CREATE DATABASE TaxiJOIN;

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
