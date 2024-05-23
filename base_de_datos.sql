CREATE DATABASE bioharvest;

-- Crear la tabla "users"
CREATE TABLE users (
  uid VARCHAR PRIMARY KEY,
  email VARCHAR,  
  password VARCHAR,
  activate BOOLEAN
);

-- Crear la tabla "informationUser"
CREATE TABLE informationUser (
  uid VARCHAR PRIMARY KEY,
  nombre VARCHAR,
  apellidop VARCHAR,
  apellidom VARCHAR,
  avatar VARCHAR,
  nacimiento DATE,
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


-- Insertar registros en la tabla users
INSERT INTO users (uid, email, password, activate) VALUES 
('2de91350-79a3-4d72-9d64-7707b427c9ca', 'replacedspace17@gmail.com', '$2b$10$SXCcIs9R163h3BZA1ez31O/U1UF6yvXYYkWc/KsUeqMMCS1VqikvK', true);

-- Insertar registros en la tabla informationUser
INSERT INTO informationUser (uid, nombre, apellidop, apellidom, avatar, nacimiento) VALUES 
('2de91350-79a3-4d72-9d64-7707b427c9ca', 'Javier', 'Gutiérrez', 'Ramírez', 'avatar2', '2000-03-19');

-- Insertar registros en la tabla cepas
INSERT INTO cepas (id, user_id, nombre, origen, medio) VALUES 
('33a437c7-3dc8-4810-a70c-d0a9dcc76689', '2de91350-79a3-4d72-9d64-7707b427c9ca', 'Chlorella Vulgaris', 'Adquirida', 'Dulce'),
('f73921eb-0ed2-45ec-b803-95a1d4274acf', '2de91350-79a3-4d72-9d64-7707b427c9ca', 'Spirulina platensis', 'Adquirida', 'Dulce'),
('77a09a84-dde6-4083-97f8-5cf5f7a51ab1', '2de91350-79a3-4d72-9d64-7707b427c9ca', 'Haematococcus pluvialis', 'Cultivada', 'Salada'),
('caa478b5-98c6-405b-94cc-7a027106435c', '2de91350-79a3-4d72-9d64-7707b427c9ca', 'Dunaliella salina', 'Adquirida', 'Salada'),
('7e0fb268-2a77-405f-ae7c-a808bf1f6055', '2de91350-79a3-4d72-9d64-7707b427c9ca', 'Tetraselmis suecica', 'Adquirida', 'Dulce');

-- Insertar registros en la tabla cultivos
INSERT INTO cultivos (id, user_id, nombre, cepa_id, motivo) VALUES 
('7d733ac1-e616-4495-878d-4a08bc1fcccc', '2de91350-79a3-4d72-9d64-7707b427c9ca', 'Fotobiorreactor 1', '33a437c7-3dc8-4810-a70c-d0a9dcc76689', 'Investigación');
