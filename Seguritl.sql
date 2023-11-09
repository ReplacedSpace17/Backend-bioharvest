-- Creacion de BD seguritl
CREATE DATABASE seguritl;

-- Tabla ACCESOS VALIDA
CREATE TABLE Accesos (
   ID SERIAL PRIMARY KEY,
   Alias VARCHAR(255) NOT NULL,
   Asunto VARCHAR(255),
   FechaFinalizacion DATE,
   Permanente BOOLEAN NOT NULL,
   Usuario_ID VARCHAR(255),
   QR_code VARCHAR(255)
);


---///// pendiente
-- Tabla Usuarios
CREATE TABLE Usuarios (
   ID SERIAL PRIMARY KEY,
   Nombre VARCHAR(255) NOT NULL,
   Apellido VARCHAR(255) NOT NULL,
   Sexo VARCHAR(10),
   Foto VARCHAR(255),
   Contraseña VARCHAR(255) NOT NULL,
   Rol VARCHAR(20) NOT NULL,
   Telefono VARCHAR(15)
);

-- Tabla Guardias
CREATE TABLE Guardias (
   ID SERIAL PRIMARY KEY,
   Nombre VARCHAR(255) NOT NULL,
   Apellido VARCHAR(255) NOT NULL,
   CURP VARCHAR(18),
   Sexo VARCHAR(10),
   Foto VARCHAR(255),
   FotoCredencial VARCHAR(255),
   Turno VARCHAR(20) NOT NULL,
   Usuario_ID INT REFERENCES Usuarios(ID)
);



-- Tabla Rondines
CREATE TABLE Rondines (
   ID SERIAL PRIMARY KEY,
   Guardia_ID INT REFERENCES Guardias(ID),
   Fecha DATE NOT NULL,
   Hora TIME NOT NULL,
   Cumplido BOOLEAN NOT NULL
);

-- Tabla ReportesIncidencias
CREATE TABLE ReportesIncidencias (
   ID SERIAL PRIMARY KEY,
   Alias VARCHAR(50) NOT NULL,
   Foto VARCHAR(255),
   Fecha DATE NOT NULL,
   Hora TIME NOT NULL,
   DescripcionDetallada TEXT,
   Guardia_ID INT REFERENCES Guardias(ID)
);




-- Insertar dos filas de ejemplo en la tabla Accesos
INSERT INTO Accesos (Alias, Asunto, FechaFinalizacion, Permanente, Usuario_ID, QR_code)
VALUES
    ('Acceso Ejemplo 1', 'Reunión de la mañana', '2023-11-15', false, 'Usuario1', 'QR123456'),
    ('Acceso Ejemplo 2', 'Evento de tarde', '2023-11-15', true, 'Usuario2', 'QR789012');
