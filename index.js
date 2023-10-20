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

////////////////////////////////////////////////////////////////////////////////////////// ENDPOINTS PACIENTES
// Ruta para registrar un paciente
app.post('/api/paciente/add', async (req, res) => {
  // Método para registrar al paciente
  const data = req.body;
  const uid = globalUID.getGlobalUid();
  AgregarPaciente(req, res, data, uid);
});

// Ruta para obtener tabla de pacientes
app.get('/api/pacientes', async (req, res) => {
  const uid = globalUID.getGlobalUid();
  
  GetTablePacientes(req, res, uid); // Pasar 'uid' como un parámetro a la función
});

//eliminar pacinete
app.delete('/api/paciente/delete/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  // Luego, puedes utilizar el ID para eliminar al paciente, por ejemplo:
  EliminarPaciente(req, res, id);
});

////////////////////////////////////////////////////////////////////////////////////////// ENDPOINTS login
// Ruta para el inicio de sesión
app.post('/api/Login', async (req, res) => {
  // Método para el inicio de sesión

  const formData = req.body;
  const UID = await Login(req, res, formData);
  globalUID.setGlobalUid(UID);
  //console.log(dato);
});


        


// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
  console.log("enro");
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  
});
