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
//const { addAcceso, validateAccess } = require('./Public_modules/Accesos');

const { AddUser, EliminarUsuario, Login } = require('./Login/functionsLogin');
const { addAcceso, getAllAccesos, deleteAccess, validateQR } = require('./Accesos/FunctionsAccesos');





////////////////////////////////////////////////////////////////////////////////////////// ENDPOINTS usuarios

////////////////////////////////////////////////////////Login
// ---- add user
app.post('/api/users/add', async (req, res) => {
  const data = req.body;
  AddUser(req, res, data);
});

// ---- delete user
app.delete('/api/users/delete/:id', async (req, res) => {
  const id = req.params.id; 
  EliminarUsuario(req, res, id);
});

// ---- delete user
app.post('/api/users/login', async (req, res) => {
  const data = req.body;
  Login(req, res, data);
});

////////////////////////////////////////////////////////-->Accesos
//add acceso
app.post('/api/access/add', async (req, res) => {
  const data = req.body;
  addAcceso(req, res, data);
});

//gets accesos
app.get('/api/access/all', (req, res) => {
  getAllAccesos(req, res);
});

//delete acceso
app.delete('/api/access/delete/:token', (req, res) => {
  const token = req.params.token;
  //console.log(token);
  deleteAccess(req, res, token);
});

//validar QR Acceso
app.post('/api/access/validate/:token', async (req, res) => {
  const token = req.params.token;
  validateQR(req, res, token);
});
  
////////////////////////////////////////////////////////--> Incidencias



// Ruta de ejemplo
app.get('/test', (req, res) => {
  res.send('¡Hola, mundo!');
  console.log("enro");
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  
});
