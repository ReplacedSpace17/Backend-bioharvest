const express = require('express');
const connection = require('./SQL_CONECTION');
const app = express();
const port = 3000;

const { 
  InsertarPersonal 
} = require('./Module1/Login/functionsLogin');

//-------------------------------------END POINTS----------------------------
//------------------------------------------------------------- Ruta de insertar personal nuevo
app.post('/Module1/Login/Insert', async (req, res) => {
  //Método para registrar al usuario
  const formData = req.body;
  InsertarPersonal(formData);
});



// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
