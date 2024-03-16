const { Pool } = require('pg');

const connection = new Pool({
  user: 'rs17', // Usuario de la base de datos PostgreSQL
  host: 'apps-posgrado-database.postgres.database.azure.com', // Dirección del servidor PostgreSQL
  database: 'bioharvest-db', // Nombre de la base de datos
  password: 'Javier117', // Contraseña del usuario
  port: 5432, // Puerto de la base de datos PostgreSQL
  ssl: {
    require: true // Requiere conexión SSL
  }
});


/* azure
const connection = new Pool({
  user: 'rs17', // Usuario de la base de datos PostgreSQL
  host: 'labgpro-server-db.postgres.database.azure.com', // Dirección del servidor PostgreSQL
  database: 'bioharvest', // Nombre de la base de datos
  password: 'tu_contraseña', // Contraseña del usuario
  port: 5432, // Puerto de la base de datos PostgreSQL
  ssl: {
    require: true // Requiere conexión SSL
  }
});





linux local postgres
const connection = new Pool({
  user: 'postgres',
  host: 'localhost', // o la dirección de tu servidor PostgreSQL
  database: 'bioharvest',
  password: 'root',
  port: 5432, // El puerto predeterminado de PostgreSQL es 5432
});
*/


connection.connect((error, client, done) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
    console.log('\n---------------------💻 BIENVENIDO AL BACKEND DE BIOHARVEST 💻---------------');
  }
});

module.exports = connection;

