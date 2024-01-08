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
  "status" VARCHAR(255)
);

--PENDIENTE HACER SU CRUD
CREATE TABLE "incidencias" (
  "id" VARCHAR(255) PRIMARY KEY,
  "tipo" VARCHAR(255), 
  "subtipo" VARCHAR(255),
  "comentario" VARCHAR(255),
  "foto" VARCHAR(255),
  "user_id" VARCHAR(255)
);

--pendiente de crear
CREATE TABLE "rondines" (
  "id" VARCHAR(255) PRIMARY KEY,
  "user_id" VARCHAR(255), 
  "tiempo" int,
  "fecha" date
);

CREATE TABLE "expedientes" (
  "id" VARCHAR(255) PRIMARY KEY,
  "user_id" VARCHAR(255),
  "nombre" VARCHAR(255),
  "apellidop" VARCHAR(255),
  "apellidom" VARCHAR(255),
  "curp" VARCHAR(255),
  "sexo" VARCHAR(255),
  "foto_url" VARCHAR(255),
  "fotocredencial_url" VARCHAR(255),
  "turno" VARCHAR(255)
);

CREATE TABLE chat (
  "id" SERIAL PRIMARY KEY,
  "mensaje" text,
  "user_id" VARCHAR(255),
);


/*////////////////////////////////////       SEED     */ 


-- Registro de usuario
INSERT INTO usuarios ("id", "tipo", "email", "password")
VALUES ('1', 'Guardia', 'guardia2@itleon.com', 'admin');




-- Registro 1
INSERT INTO accesos ("token", "alias", "asunto", "expiracion", "permanente", "user_id", "status")
VALUES ('token1', 'Alias1', 'Asunto1', '2023-12-01', true, 'admin', 'Active');

-- Registro 2 (expirado)
INSERT INTO accesos ("token", "alias", "asunto", "expiracion", "permanente", "user_id", "status")
VALUES ('token2', 'Alias2', 'Asunto2', '2022-01-01', false, 'admin', 'Active');

-- Registro 3 (con fecha futura)
INSERT INTO accesos ("token", "alias", "asunto", "expiracion", "permanente", "user_id", "status")
VALUES ('token3', 'Alias3', 'Asunto3', '2024-01-01', false, 'admin', 'Active');

/* incidencias
{
    "tipo": "Ejemplo",
    "subtipo": "dsad",
    "comentario": "dsdaad",
    "foto": "dsads.jpgd",
    "user_id": "dawdwadwadwadawd"
}
*/