CREATE DATABASE bioharvest;

-- Crear la tabla "users"
CREATE TABLE users (
  uid VARCHAR PRIMARY KEY,
  email VARCHAR,
  password VARCHAR,
  activate BOOLEAN
);

-- Crear la tabla "personal_information"
CREATE TABLE personal_information (
  uid VARCHAR PRIMARY KEY,
  nombre VARCHAR,
  apellidop VARCHAR,
  apellidom VARCHAR,
  avatar VARCHAR,
  nacimiento DATE
);
