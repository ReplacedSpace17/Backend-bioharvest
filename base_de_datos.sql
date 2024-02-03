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

--Crear la tabla "cepas"
CREATE TABLE cepas (
  id VARCHAR PRIMARY KEY,
  uid VARCHAR,
  nombre VARCHAR,
  origen VARCHAR,
  medio VARCHAR
);

--Crear la tabla "cultivos"
CREATE TABLE cultivos (
  id VARCHAR PRIMARY KEY,
  nombre VARCHAR,
  cepaid VARCHAR,
  motivo VARCHAR
);
