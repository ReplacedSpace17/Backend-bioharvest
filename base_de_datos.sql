-- Creacion de BD seguritl
CREATE DATABASE seguritl;

-- Tabla Usuarios
CREATE TABLE "usuarios" (
  "id" VARCHAR(255) PRIMARY KEY,
  "tipo" VARCHAR(255), 
  "email" VARCHAR(255),
  "password" VARCHAR(255)
);

CREATE TABLE "accesos" (
  "token" VARCHAR(255) PRIMARY KEY,
  "alias" VARCHAR(255), 
  "asunto" VARCHAR(255),
  "expiracion" date,
  "permanente" boolean,
  "user_id" VARCHAR(255),
  "status" VARCHAR(255),
);

--PENDIENTE HACER SU CRUD
CREATE TABLE "incidencias" (
  "id" VARCHAR(255) PRIMARY KEY,
  "tipo" VARCHAR(255), 
  "subtipo" VARCHAR(255),
  "comentario" date,
  "foto" boolean,
  "user_id" VARCHAR(255)
);

--pendiente de crear
CREATE TABLE "rondines" (
  "id" VARCHAR(255) PRIMARY KEY,
  "user_id" VARCHAR(255), 
  "timpo" int,
  "fecha" date
);


