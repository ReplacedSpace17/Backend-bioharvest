const express = require('express');
const connection = require('./SQL_CONECTION');
const app = express();
const port = 3002;
const cors = require('cors'); // Importa el middleware CORS
const bodyParser = require('body-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');
app.use(bodyParser.json({ limit: '20mb' })); // Ajusta el límite según tus necesidades
app.use('/uploads', express.static('uploads'));

app.use(cors({
  origin: '*', // Origen permitido (URL de tu aplicación de React) http://20.102.109.114:3001/
  credentials: true, // Habilita el envío de cookies de origen a través de CORS
}));



const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
// other app.use() options ...
app.use(expressCspHeader({ 
    policies: { 
        'default-src': [expressCspHeader.NONE], 
        'img-src': [expressCspHeader.SELF], 
        'script-src': [expressCspHeader.SELF],
        'style-src': [expressCspHeader.SELF],
        'object-src': [expressCspHeader.NONE],
        'frame-src': [expressCspHeader.NONE],
        'base-uri': [expressCspHeader.NONE],
        'form-action': [expressCspHeader.NONE],
        'frame-ancestors': [expressCspHeader.NONE],
        'manifest-src': [expressCspHeader.NONE],
        'media-src': [expressCspHeader.NONE],
        'worker-src': [expressCspHeader.NONE]
    } 
}));  

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
const session = require('express-session');
const multer = require('multer');
// Importa la librería jsonwebtoken

// Configura express-session
app.use(session({
  secret: 'tu_secreto', // Cambia esto a una cadena secreta segura
  resave: false,
  saveUninitialized: true
}));

// configuracion de funciones
const { checkEmailExists, addUser, activateUser, updatePersonalInfo } = require('./CrearCuenta/functionAccountNew');
const {Login} = require('./Login/functionsLogin');
const {addCepa, editCepa, deleteCepa, getCepa, getAllCepas, getMedioCepas, getTotalCepas} = require('./CepasYCultivos/FunctionsCepas');
const {addCultivo, editCultivo, deleteCultivo, getCultivo, getAllCultivos, getCultivoCountByUser} = require('./CepasYCultivos/FunctionsCultivos');

let codigoInfo = {};
let time;


//-------------------------------------------------------------> Cuenta
app.post('/api/validate-email/:email', (req, res) => {
  const { email } = req.params;

  checkEmailExists(req, res, email);
});

// agregar usuario
app.post('/api/user', (req, res) => {
const data = req.body;
addUser(req, res, data);
//console.log("Agregando usuario");
});

//enviar codigo
app.post('/api/validate-code/:email', (req, res) => {
  const { email } = req.params;
  // Llamada a la función enviarCode con la asignación de la variable global
  enviarCode(email).then((info) => {
    codigoInfo = info;
//    //console.log('Código generado:', info);
  }).catch((error) => {
    console.error('Error al enviar el código:', error);
    // Puedes manejar el error según tus necesidades
  });
});

app.post('/api/activate-user/:email', (req, res) => {
  const { email } = req.params;
  const { code } = req.body;
  


  if (Number(code) === Number(codigoInfo.code)) {
    //console.log("Codigo correcto");
    activateUser(req, res, email);
    console.log("Nueva cuenta activada 🚀 \n Email: "+email);
    res.status(200);
  } else {
    //console.log("Codigo incorrecto");
    res.status(201);
  }
});

// actualizar fecha de nacimiento
app.post('/api/final-new-user/:uid', (req, res) => {
  const { uid } = req.params;
  const {birthdate} = req.body;
  const {avatarName} = req.body;
  
  updatePersonalInfo(req, res, birthdate, avatarName, uid);
  
  
});

////////////////////////////////////////////////////////-----------------> Login

app.post('/api/login/', async (req, res) => {
  const formData = req.body;
  //console.log("Form data: " + formData.Email);
  const loginResult = await Login(formData);
  if (loginResult.success) {
    console.log("Autenticación exitosa ");
    res.status(200).json(loginResult);
  } else {
    console.log("Credenciales incorrectas");
    res.status(401).json(loginResult);
  }
});


////////////////////////////////////////////////////////-----------------> Cepas

app.post('/api/cepas/', async (req, res) => {
  const formData = req.body;
  //console.log("Form data: " + formData.Email);
  addCepa(req, res, formData);
});

app.put('/api/cepas/:id', async (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  editCepa(req, res, formData, id);
});

app.get('/api/cepas/user/:id', async (req, res) => {
  const id = req.params.id;
  //console.log("Form data: " + formData.Email);
  getAllCepas(req, res, id);
});

//delete
app.delete('/api/cepas/:id', async (req, res) => {
  const id = req.params.id;
  console.log("Eliminando cepa: " + id);
  deleteCepa(req, res, id);
});

//get cepa medio
app.get('/api/cepas/medio/:id', async (req, res) => {
  const id = req.params.id;
  //console.log("Form data: " + formData.Email);
  getMedioCepas(req, res, id);
});

//get cepa total
app.get('/api/cepas/total/:id', async (req, res) => {
  const id = req.params.id;
  //console.log("Form data: " + formData.Email);
  getTotalCepas(req, res, id);
});

////////////////////////////////////////////////////////-----------------> Cultivos
// Crear un cultivo
app.post('/api/cultivos/', async (req, res) => {
  const formData = req.body;
  //console.log("Form data: " + formData.Email);
  addCultivo(req, res, formData);
});

app.put('/api/cultivos/:id', async (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  editCultivo(req, res, formData, id);
});

app.get('/api/cultivos/user/:id', async (req, res) => {
  const id = req.params.id;
  //console.log("Form data: " + formData.Email);
  getAllCultivos(req, res, id);
});

//delete
app.delete('/api/cultivos/:id', async (req, res) => {
  const id = req.params.id;
  console.log("Eliminando cepa: " + id);
  deleteCultivo(req, res, id);

});

//get coutn cultivos
app.get('/api/cultivos/count/:id', async (req, res) => {
  const id = req.params.id;
  //console.log("Form data: " + formData.Email);
  getCultivoCountByUser(req, res, id);
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

/* --- Funciones de Mail --- */
async function enviarCode(email) {
  // Configurar el transporte de correo
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bioharvest.contact@gmail.com',
      pass: 'sxgl odwe wnhi qoqy ',
    },
  });

  // Generar un código aleatorio (puedes usar cualquier lógica que necesites)
  const code = Math.floor(100000 + Math.random() * 900000); // Ejemplo: código de 6 dígitos

  // Obtener la marca de tiempo actual en milisegundos
  const timestamp = Date.now();

  // Contenido del correo
  const mailOptions = {
    from: 'bioharvest.contact@gmail.com',
    to: email,
    subject: 'Código de Verificación',
    text: `Tu código de verificación es: ${code}`,
  };

  try {
    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);

    // Puedes realizar acciones adicionales aquí, como guardar el código y la marca de tiempo en la base de datos asociado a la UID, etc.
    //console.log('Código enviado con éxito. Detalles:', info);

    // Devolver el código generado y la marca de tiempo
    return { code, timestamp };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error;
  }
}


async function sendCODE(email) {
  enviarCode(email).then((code) => {
    //console.log('Código generado:', code);
  }).catch((error) => {
    console.error('Error:', error);
  });
}

// Ruta de ejemplo
app.get('/test', (req, res) => {
  res.send('¡Hola, mundo!');
  //console.log("Test");
});
app.get('/', (req, res) => {
  res.send('Backend online');
  //console.log("Test");
});


// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);

});
