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
  FOREIGN KEY (uid) REFERENCES users(uid)
);


CREATE TABLE cepas (
  id VARCHAR PRIMARY KEY,
  user_id VARCHAR,
  nombre VARCHAR,
  origen VARCHAR,
  medio VARCHAR,
  FOREIGN KEY (user_id) REFERENCES users(uid)
);

--Crear la tabla "cultivos"
CREATE TABLE cultivos (
  id VARCHAR PRIMARY KEY,
  user_id VARCHAR,
  nombre VARCHAR,
  cepa_id VARCHAR,
  motivo VARCHAR,
  FOREIGN KEY (cepa_id) REFERENCES cepas(id)
);

--Crear la tabla "biomasa"
CREATE TABLE biomasa (
  id VARCHAR PRIMARY KEY,
  user_id VARCHAR,
  cultivo_id VARCHAR,
  cantidad VARCHAR,
  fecha DATE,
  FOREIGN KEY (cultivo_id) REFERENCES cultivos(id)
);
