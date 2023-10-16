const express = require('express');
const connection = require('./SQL_CONECTION');
const app = express();
const port = 3000;

const cors = require('cors'); // Importa el middleware CORS

app.use(cors()); // Habilita el middleware CORS

app.use(express.json());

const { InsertarPaciente, GetTablePacientes } = require('./Pacientes/functionsPacientes');
const { Login } = require('./Login/functionsLogin');

// Ruta para registrar un paciente
app.post('/api/paciente/add', async (req, res) => {
  // Método para registrar al paciente
  const formData = req.body;
  console.log(formData);
  InsertarPaciente(req, res, formData);
});

// Ruta para el inicio de sesión
app.post('/api/Login', async (req, res) => {
  // Método para el inicio de sesión
  console.log("Entro");
  const formData = req.body;
  console.log(formData);
  Login(req, res, formData);
});


// Ruta para obtener tabla de pacientes
app.get('/api/pacientes', async (req, res) => {

  GetTablePacientes(req, res);
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
