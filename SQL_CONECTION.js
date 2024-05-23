const { Pool } = require('pg');

const connection = new Pool({
  user: 'postgres',
  host: 'localhost', // o la dirección de tu servidor PostgreSQL
  database: 'bioharvest',
  password: 'root',
  port: 5432, // El puerto predeterminado de PostgreSQL es 5432
});




const HOST_DB = process.env.HOSTDB || 'apps-posgrado-database.postgres.database.azure.com';
const USR_NAME = process.env.USERDB || 'rs17';
const PWD_DB = process.env.PASSWORD || 'Javier117';
const DB_NAME = process.env.DATABASE || 'bioharvest-db';
const PORT_DB = process.env.PORT || 5432;

/*
const connection = new Pool({
  user: USR_NAME,
  host: HOST_DB, // o la dirección de tu servidor PostgreSQL
  database: DB_NAME,
  password: PWD_DB,
  port: PORT_DB, // El puerto predeterminado de PostgreSQL es 5432
  ssl: true, // Habilita la conexión SSL
});
*/
//postgres://rs17:'Javier117'@apps-posgrado-database.postgres.database.azure.com:5432/bioharvest-db

connection.connect((error, client, done) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
    console.log('\n---------------------💻 BIENVENIDO AL BACKEND DE BIOHARVEST 💻---------------');
  }
});

module.exports = connection;


/*
CONECCION EN LINUX

const connection = new Pool({
  user: 'postgres',
  host: 'localhost', // o la dirección de tu servidor PostgreSQL
  database: 'cognitivedb',
  password: 'root',
  port: 5432, // El puerto predeterminado de PostgreSQL es 5432
});

CONECCION EN windows

const connection = new Pool({
  user: 'postgres',
  host: 'localhost', // o la dirección de tu servidor PostgreSQL
  database: 'cognitivedb',
  password: 'root',
  port: 5432, // El puerto predeterminado de PostgreSQL es 5432
});

 Para acceder a postgresql
 sudo -u postgres psql

 Mostrar db
 \l

 Conectarme a db
 \c nameDB;
 Listar tablas
 \dt
 */