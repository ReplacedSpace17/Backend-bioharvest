const express = require('express');
const connection = require('./SQL_CONECTION');
const app = express();
const port = 3000;

const { 
  InsertarPersonal 
} = require('./Module1/Login/functionsLogin');

//-------------------------------------END POINTS----------------------------

app.post('/Module1/Login/Insert', async (req, res) => {
  //Método para registrar al usuario
  const formData = req.body;
  InsertarPersonal(formData);
});



app.put('/api/Module3/EditUser/:UID', async (req, res) => {
  const UID = req.params.UID; // Obtener el UID del usuario a editar
  const dataUpdate = req.body; // Datos actualizados del usuario
  EditUserInformation(req, res, UID, dataUpdate);
  // Realizar una consulta para actualizar los datos del usuario en la base de datos
});

app.get('/api/Module3/GetUser/:UID', async (req, res) => {
  const UID = req.params.UID; // Obtener el UID del usuario a consultar
  GetUserInformation(req, res, UID);
});

// Endpoint para eliminar cuenta de usuario por UID
app.delete('/api/Module3/DeleteUser/:UID', async (req, res) => {
  const UID = req.params.UID; // Obtener el UID del usuario a eliminar
  DeleteUserAccount(req, res, UID);
});


app.post('/api/Module4/CreateRutines', async (req, res) => {
  const RutinesData = req.body; // Datos del nuevo Rutina a crear
  CreateRutines(req, res, RutinesData);
});


app.get('/api/Module4/GetUserRutines/:UID', async (req, res) => {
  const UID = req.params.UID; // Obtener el UID del usuario
  GetUserRutiness(req, res, UID);
});

app.put('/api/Module4/UpdateRutines/:FID', async (req, res) => {
  const FID = req.params.FID; // Obtener el FID del Rutina a actualizar
  const updatedRutinesData = req.body; // Datos actualizados del Rutina
  UpdateRutinesInformation(req, res, FID, updatedRutinesData);
});

// Endpoint para eliminar un Rutina por FID
app.delete('/api/Module4/DeleteRutines/:FID', async (req, res) => {
  const FID = req.params.FID; // Obtener el FID del Rutina a eliminar
  DeleteRutines(req, res, FID);
});

//////////////////////////////////juegos act

app.post('/api/Module4/CreateActivity', async (req, res) => {
  const newActivityData = req.body; // Datos de la nueva actividad
  CreateActivity(req, res, newActivityData);
});

// Endpoint para obtener las actividades de un usuario por su UID
app.get('/api/GetActivitiesByUID/:UID', async (req, res) => {
  const UID = req.params.UID; // Obtener el UID del usuario
  GetActivitiesByUID(req, res, UID);
});


// Endpoint para actualizar una actividad por su AID
app.put('/api/UpdateActivity/:AID', async (req, res) => {
  const AID = req.params.AID; // Obtener el AID de la actividad a actualizar
  const updatedActivityData = req.body; // Datos actualizados de la actividad
  UpdateActivity(req, res, AID, updatedActivityData);
});


//////- Modify user
app.put('/apiEditRtines/:UID', async (req, res) => {
  const UID = req.params.UID; // Obtener el UID del usuario a editar
  const dataUpdate = req.body; // Datos actualizados del usuario
  EditUserInformation(req, res, UID, dataUpdate);
  // Realizar una consulta para actualizar los datos del usuario en la base de datos
});

// Obtener info del usuario
app.get('/api/GetUser/:UID', async (req, res) => {
  const UID = req.params.UID; // Obtener el UID del usuario a consultar
  GetUserInformation(req, res, UID);
});

// Endpoint para eliminar cuenta de usuario por UID
app.delete('/api/DeleteUser/:UID', async (req, res) => {
  const UID = req.params.UID; // Obtener el UID del usuario a eliminar
  DeleteUserAccount(req, res, UID);
});

//------------------------------------------------------------- MODULO 4
///// Rutiness
// Endpoint para crear un nuevo Rutina
app.post('/api/Module4/CreateRutines', async (req, res) => {
  const RutinesData = req.body; // Datos del nuevo Rutina a crear
  CreateRutines(req, res, RutinesData);
});

// Endpoint para obtener la lista de Rutinas de un usuario por UID
app.get('/api/Module4/GetUserRutiness/:UID', async (req, res) => {
  const UID = req.params.UID; // Obtener el UID del usuario
  GetUserRutiness(req, res, UID);
});

// Endpoint para actualizar información de un Rutina por FID
app.put('/api/Module4/UpdateRutines/:FID', async (req, res) => {
  const FID = req.params.FID; // Obtener el FID del Rutina a actualizar
  const updatedRutinesData = req.body; // Datos actualizados del Rutina
  UpdateRutinesInformation(req, res, FID, updatedRutinesData);
});

// Endpoint para eliminar un Rutina por FID
app.delete('/api/Module4/DeleteRutines/:FID', async (req, res) => {
  const FID = req.params.FID; // Obtener el FID del Rutina a eliminar
  DeleteRutines(req, res, FID);
});

//////////////////////////////////actividad
// Endpoint para crear una nueva actividad
app.post('/api/Module4/CreateActivity', async (req, res) => {
  const newActivityData = req.body; // Datos de la nueva actividad
  CreateActivity(req, res, newActivityData);
});

// Endpoint para obtener las actividades de un usuario por su UID
app.get('/api/Module4/GetActivitiesByUID/:UID', async (req, res) => {
  const UID = req.params.UID; // Obtener el UID del usuario
  GetActivitiesByUID(req, res, UID);
});


// Endpoint para actualizar una actividad por su AID
app.put('/api/Module4/UpdateActivity/:AID', async (req, res) => {
  const AID = req.params.AID; // Obtener el AID de la actividad a actualizar
  const updatedActivityData = req.body; // Datos actualizados de la actividad
  UpdateActivity(req, res, AID, updatedActivityData);
});



// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
