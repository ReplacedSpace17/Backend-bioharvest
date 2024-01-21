const express = require('express');
const connection = require('./SQL_CONECTION');
const app = express();
const port = 3000;
const cors = require('cors'); // Importa el middleware CORS
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json({ limit: '20mb' })); // Ajusta el límite según tus necesidades
app.use('/uploads', express.static('uploads'));

app.use(cors()); // Habilita el middleware CORS
app.use(express.json());
const session = require('express-session');
const multer = require('multer');

// Configura express-session
app.use(session({
  secret: 'tu_secreto', // Cambia esto a una cadena secreta segura
  resave: false,
  saveUninitialized: true
}));


// ---- add user
app.post('/api/users/add', async (req, res) => {
  const data = req.body;

});




////////////////////////////////////////////////////////-----------------> Incidencias
// Crear una incidencia
/*
app.post('/api/incidencias/create', async (req, res) => {
  try {
    const data = req.body;
    const fotoBase64 = data.foto;

    if (fotoBase64) {
      // Decodificar la imagen base64 y guardarla en el sistema de archivos
      const imageBuffer = Buffer.from(fotoBase64, 'base64');
      const imageName = Date.now() + '-photo.jpg'; // Nombre de archivo único
      const imagePath = 'uploads/Incidencias/' + imageName; // Ruta completa del archivo
      fs.writeFileSync(imagePath, imageBuffer);
      data.foto = imagePath; // Actualizar el campo 'foto' con la ruta al archivo guardado
      
    }

    await addIncidencia(req, res, data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

*/


// Ruta de ejemplo
app.get('/test', (req, res) => {
  res.send('¡Hola, mundo!');
  console.log("enro");
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);

});
