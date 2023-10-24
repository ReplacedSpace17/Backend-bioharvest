const express = require('express');
const connection = require('./SQL_CONECTION');
const app = express();
const port = 3000;
const cors = require('cors'); // Importa el middleware CORS
app.use(cors()); // Habilita el middleware CORS
app.use(express.json());
const session = require('express-session');

// Configura express-session
app.use(session({
  secret: 'tu_secreto', // Cambia esto a una cadena secreta segura
  resave: false,
  saveUninitialized: true
}));

////////////////////////////////////////////////////////////////////////////////////////// IMPORTS FUNCTIONS
const globalUID = require('./globalUID'); 
const {AddNewUser } = require('./Usuarios/functionUsuarios');
const { AgregarPaciente, GetTablePacientes, EliminarPaciente } = require('./Pacientes/functionsPacientes');
const { Login, getUID } = require('./Login/functionsLogin');



////////////////////////////////////////////////////////////////////////////////////////// ENDPOINTS usuarios

// Ruta para registrar un paciente
app.post('/api/usuarios/add', async (req, res) => {
  const data = req.body;
  //console.log(data);
  const uid = globalUID.getGlobalUid();
  AddNewUser(req, res, data, uid);
});


        


// Ruta de ejemplo
app.get('/test', (req, res) => {
  res.send('¡Hola, mundo!');
  console.log("enro");
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  
});
