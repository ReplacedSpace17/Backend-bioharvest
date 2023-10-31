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
const { addAcceso, validateAccess } = require('./Public_modules/Accesos');




////////////////////////////////////////////////////////////////////////////////////////// ENDPOINTS usuarios

// Ruta para crear un acceso
app.post('/api/accesos/add', async (req, res) => {
  const data = req.body;
  //console.log(data);
  
  addAcceso(req, res, data);
});

app.get('/api/accesos/validate', async (req, res) => {
  const data = req.body;
  //console.log(data);
  
  validateAccess(req, res, data);
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
