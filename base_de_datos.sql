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
  "user_id" VARCHAR(255),
  "fecha" date
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
  "user_id" VARCHAR(255)
);

CREATE TABLE detallesRondines (
  "id" SERIAL PRIMARY KEY,
  "id_rondin" VARCHAR(255),
  "user_id" VARCHAR(255),
  "fecha" date,
  "point1" time,
  "point2" time,
  "point3" time,
  "point4" time,
  "point5" time,
  "point6" time,
  "point7" time,
  "point8" time,
  "point9" time,
  "point10" time
);

/*////////////////////////////////////       SEED     */ 


-- Registro de usuario
INSERT INTO usuarios ("id", "tipo", "email", "password")
VALUES ('A001', 'Administrador', 'admin2@itleon.com', 'admin2');
-- Registro de usuario
INSERT INTO usuarios ("id", "tipo", "email", "password")
VALUES ('G001', 'Guardia', 'guardia@itleon.com', 'guardia');

-- Inserts para la tabla "rondines"
INSERT INTO rondines (id, user_id, tiempo, fecha) VALUES
  ('abc12', 'G001', 30, '2024-01-16'),
  ('def34', 'G001', 45, '2024-01-17'),
  ('ghi56', 'G001', 60, '2024-01-18'),
  ('jkl78', 'G001', 40, '2024-01-19'),
  ('mno90', 'G001', 55, '2024-01-20'),
  ('pqr12', 'G001', 35, '2024-01-21'),
  ('stu34', 'G001', 50, '2024-01-22'),
  ('vwx56', 'G001', 25, '2024-01-23'),
  ('yz01', 'G001', 70, '2024-01-24'),
  ('123ab', 'G001', 55, '2024-01-25');

-- Inserts para la tabla "detallesRondines" con variaciones en las horas
INSERT INTO detallesRondines (id_rondin, user_id, fecha, point1, point2, point3, point4, point5, point6, point7, point8, point9, point10) VALUES
  ('abc12', 'G001', '2024-01-16', '08:00:00', '09:30:00', '11:00:00', '12:30:00', '14:00:00', '15:30:00', '17:00:00', '18:30:00', '20:00:00', '21:30:00'),
  ('def34', 'G001', '2024-01-17', '08:30:00', '10:00:00', '11:30:00', '13:00:00', '14:30:00', '16:00:00', '17:30:00', '19:00:00', '20:30:00', '22:00:00'),
  ('ghi56', 'G001', '2024-01-18', '09:00:00', '10:30:00', '12:00:00', '13:30:00', '15:00:00', '16:30:00', '18:00:00', '19:30:00', '21:00:00', '22:30:00'),
  ('jkl78', 'G001', '2024-01-19', '09:30:00', '11:00:00', '12:30:00', '14:00:00', '15:30:00', '17:00:00', '18:30:00', '20:00:00', '21:30:00', '23:00:00'),
  ('mno90', 'G001', '2024-01-20', '10:00:00', '11:30:00', '13:00:00', '14:30:00', '16:00:00', '17:30:00', '19:00:00', '20:30:00', '22:00:00', '23:30:00'),
  ('pqr12', 'G001', '2024-01-21', '10:30:00', '12:00:00', '13:30:00', '15:00:00', '16:30:00', '18:00:00', '19:30:00', '21:00:00', '22:30:00', '00:00:00'),
  ('stu34', 'G001', '2024-01-22', '11:00:00', '12:30:00', '14:00:00', '15:30:00', '17:00:00', '18:30:00', '20:00:00', '21:30:00', '23:00:00', '00:30:00'),
  ('vwx56', 'G001', '2024-01-23', '11:30:00', '13:00:00', '14:30:00', '16:00:00', '17:30:00', '19:00:00', '20:30:00', '22:00:00', '23:30:00', '01:00:00'),
  ('yz01', 'G001', '2024-01-24', '12:00:00', '13:30:00', '15:00:00', '16:30:00', '18:00:00', '19:30:00', '21:00:00', '22:30:00', '00:00:00', '01:30:00'),
  ('123ab', 'G001', '2024-01-25', '12:30:00', '14:00:00', '15:30:00', '17:00:00', '18:30:00', '20:00:00', '21:30:00', '23:00:00', '00:30:00', '02:00:00');


/* incidencias
{
    "tipo": "Ejemplo",
    "subtipo": "dsad",
    "comentario": "dsdaad",
    "foto": "dsads.jpgd",
    "user_id": "dawdwadwadwadawd"
}
*/