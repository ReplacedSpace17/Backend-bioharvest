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

////////////////////////////////////////////////////////////////////////////////////////// IMPORTS FUNCTIONS
const globalUID = require('./globalUID');
//const { addAcceso, validateAccess } = require('./Public_modules/Accesos');
const { addMensaje, getAllMensajes} = require('./Chat/FunctionsChat');

const { AddUser, EliminarUsuario, Login, GetUsers, EditUser, GetUserById } = require('./Login/functionsLogin');
const { addAcceso, getAllAccesos, deleteAccess, validateQR, updateAccess} = require('./Accesos/FunctionsAccesos');
const {
  addIncidencia,
  updateIncidencia,
  deleteIncidencia,
  getIncidencia,
  getAllIncidencia
} = require('./Incidencias/FunctionIncidencias');

const { addRondin, deleteRondin, getAllRondines, addDetallesRondin, getAllDetallesRondines, getDetalleID, GetMostRegisteredIncidentTypes } = require('./Rondines/FunctionRondines');

const {AddExpediente,
  GetExpedienteById,
  DeleteExpedienteById,
  UpdateExpedienteById,
  GetAllExpedientes, getInfoEdit, EditExpediente, EditExpedienteFOTO }= require('./Expedientes/functionsExpedientes');


//config almacenamiento fotos de incidencias
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/Incidencias'); // Directorio donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nombre de archivo único
  },
});

const upload = multer({ storage: storage });

////////////////////////////////////////////////////////////////////////////////////////// ENDPOINTS usuarios

////////////////////////////////////////////////////////-----------------> Usuarios
// ---- add user
app.post('/api/users/add', async (req, res) => {
  const data = req.body;
  AddUser(req, res, data);
});
//obtener usuarios
app.get('/api/users/getAll', async (req, res) =>{
  console.log('Obteniendo usuarios [X]');
  GetUsers(req, res);
});

//obtener usuarios
app.get('/api/users/:id', async (req, res) =>{
  const userId = req.params.id; 
  console.log('Obteniendo usuarios por ID: '+ userId);
  GetUserById(req, res, userId);
});

//obtener usuariosedit
app.get('/api/usersGetAll/:id', async (req, res) =>{
  const userId = req.params.id; 
  getInfoEdit(req, res, userId);
});


// ---- delete user
app.delete('/api/users/delete/:id', async (req, res) => {
  const id = req.params.id;
  EliminarUsuario(req, res, id);
});

// Editar usuario
app.put('/api/users/edit/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  EditUser(req, res, id, data);
});

////////////////////////////////////////////////////////-----------------> Login
// Login function
app.post('/api/users/login', async (req, res) => {
  const data = req.body;
  Login(req, res, data);
});

////////////////////////////////////////////////////////-----------------> Accesos QR

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

app.put('/api/access/update/:token', (req, res) => {
  const token = req.params.token;
  const newData = req.body;
  //console.log(token);
  updateAccess(req, res, token, newData);
});


//validar QR Acceso
app.post('/api/access/validate/:token', async (req, res) => {
  const token = req.params.token;
  console.log('Validando: ' + token);
  validateQR(req, res, token);
});

////////////////////////////////////////////////////////-----------------> CHAT

//add acceso
app.post('/api/chat/add', async (req, res) => {
  const data = req.body;
  addMensaje(req, res, data);
});

//gets accesos
app.get('/api/chat/all', (req, res) => {
  getAllMensajes(req, res);
});


////////////////////////////////////////////////////////-----------------> Incidencias
// Crear una incidencia
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


// Obtener tlos mas registrados
app.get('/api/incident/most', async (req, res) => {
  GetMostRegisteredIncidentTypes(req, res);
});

// Modificar una incidencia
app.put('/api/incidencias/update/:id', async (req, res) => {
  const data = req.body;
  data.id = req.params.id;
  updateIncidencia(req, res, data);
});

// Eliminar una incidencia
app.delete('/api/incidencias/delete/:id', async (req, res) => {
  const incidenciaId = req.params.id;
  deleteIncidencia(req, res, incidenciaId);
});

// Ver una incidencia
app.get('/api/incidencias/:id', async (req, res) => {
  const incidenciaId = req.params.id;
  getIncidencia(req, res, incidenciaId);
});

// Ver una incidencia
app.get('/api/incidencias', async (req, res) => {
  getAllIncidencia(req, res);
});

////////////////////////////////////////////////////////-----------------> rondines
// Crear una rondin
app.post('/api/rondines/create', async (req, res) => {
  const data = req.body;
  addRondin(req, res, data);
});

// Agregar detalles de rondin
app.post('/api/rondines/details/add', async (req, res) => {
  const data = req.body;
  addDetallesRondin(req, res, data);
});

// Obtener todos los rondines
app.get('/api/rondines/details', async (req, res) => {
  getAllDetallesRondines(req, res);
});

// Obtener todos los rondines
app.get('/api/rondines/details/:id', async (req, res) => {
  const id = req.params.id;
  getDetalleID(req, res, id);
});


// Eliminar un rondin
app.delete('/api/rondines/delete/:id', async (req, res) => {
  const rondinId = req.params.id;
  console.log(rondinId);
  deleteRondin(req, res, rondinId);
});

// Obtener todos los rondines
app.get('/api/rondines', async (req, res) => {
  getAllRondines(req, res);
});


////////////////////////////////////////////////////////-----------------> Expedientes
// ---- add user
app.post('/api/users/expediente/add', async (req, res) => {

  try {
    const data = req.body;
    //obtener la foto url
    const fotoURL64 = data.foto_url;
    const credencial64 = data.fotocredencial_url;
    
    //almacenar fotos
    if (fotoURL64) {
      // Decodificar la imagen base64 y guardarla en el sistema de archivos
      const imageBuffer = Buffer.from(fotoURL64, 'base64');
      const imageName = Date.now() + '-photo.jpg'; // Nombre de archivo único
      const imagePath = 'uploads/Expediente/Fotos/' + imageName; // Ruta completa del archivo
      fs.writeFileSync(imagePath, imageBuffer);
      data.foto_url = imagePath; // Actualizar el campo 'foto' con la ruta al archivo guardado
      console.log('Foto guardada en ' + imagePath);
    }

    //almacenar credenciales
    if (credencial64) {
      // Decodificar la imagen base64 y guardarla en el sistema de archivos
      const imageBuffer = Buffer.from(credencial64, 'base64');
      const imageName = Date.now() + '-photo.jpg'; // Nombre de archivo único
      const imagePath = 'uploads/Expediente/Credenciales/' + imageName; // Ruta completa del archivo
      fs.writeFileSync(imagePath, imageBuffer);
      data.fotocredencial_url = imagePath; // Actualizar el campo 'foto' con la ruta al archivo guardado
      console.log('Credencial guardada en ' + imagePath);
    }

    await AddExpediente(req, res, data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }


});


app.put('/api/users/expediente/modify', async (req, res) => {

  try {
    const data = req.body;
    //obtener la foto url
    const fotoURL64 = data.foto_url;
    const credencial64 = data.fotocredencial_url;
    
    //almacenar fotos
    if (fotoURL64) {
      // Decodificar la imagen base64 y guardarla en el sistema de archivos
      const imageBuffer = Buffer.from(fotoURL64, 'base64');
      const imageName = Date.now() + '-photo.jpg'; // Nombre de archivo único
      const imagePath = 'uploads/Expediente/Fotos/' + imageName; // Ruta completa del archivo
      fs.writeFileSync(imagePath, imageBuffer);
      data.foto_url = imagePath; // Actualizar el campo 'foto' con la ruta al archivo guardado
      console.log('Foto guardada en ' + imagePath);
    }

    //almacenar credenciales
    if (credencial64) {
      // Decodificar la imagen base64 y guardarla en el sistema de archivos
      const imageBuffer = Buffer.from(credencial64, 'base64');
      const imageName = Date.now() + '-photo.jpg'; // Nombre de archivo único
      const imagePath = 'uploads/Expediente/Credenciales/' + imageName; // Ruta completa del archivo
      fs.writeFileSync(imagePath, imageBuffer);
      data.fotocredencial_url = imagePath; // Actualizar el campo 'foto' con la ruta al archivo guardado
      console.log('Credencial guardada en ' + imagePath);
    }

    await EditExpedienteFOTO(req, res, data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }


});

app.put('/api/users/expediente/edit', async (req, res) => {
  const data = req.body;
  EditExpediente(req, res, data);

});

//obtener usuarios
app.get('/api/users/expediente/getAll', async (req, res) =>{
  console.log('Obteniendo expedientes [X]');
  GetAllExpedientes(req, res);
});

//obtener usuarios por id
app.get('/api/users/expediente/getID/:id', async (req, res) =>{
  const id = req.params.id;
  console.log('Obteniendo expedientes por ID');
  GetExpedienteById(req, res, id);
});

// ---- delete user
app.delete('/api/users/expediente/delete/:id', async (req, res) => {
  const id = req.params.id;
  DeleteExpedienteById(req, res, id);
});

// Editar usuario
app.put('/api/users/expediente/edit/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  UpdateExpedienteById(req, res, id, data);
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
