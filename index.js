const express = require('express');
const connection = require('./SQL_CONECTION');
const app = express();
const port = 3000;

const cors = require('cors'); // Importa el middleware CORS

app.use(cors()); // Habilita el middleware CORS

app.use(express.json());

const { InsertarPaciente } = require('./Pacientes/functionsPacientes');
const { Login } = require('./Login/functionsLogin');

// Ruta para registrar un paciente
app.post('/api/Pacientes/Add', async (req, res) => {
  // Método para registrar al paciente
  const formData = req.body;
  console.log(formData);
  InsertarPaciente(req, res, formData);
});

// Ruta para el inicio de sesión
app.post('/api/Login', async (req, res) => {
  // Método para el inicio de sesión
  const formData = req.body;
  console.log(formData);
  Login(req, res, formData);
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
