const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');

function generarTokenID() {
  return uuidv4();
}

function InsertarPaciente(req, res, formData) {
  // Iniciar la inserción en la tabla "paciente"
  connection.query(
    'INSERT INTO "paciente" ("PID", "UID", "Nombre", "ApellidoP", "ApellidoM", "Genero", "Direccion", "Telefono", "FechaIngreso", "FechaNacimiento") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
    [
      formData.UID, // Asegúrate de que formData contenga el valor de UID
      formData.PID, // Asegúrate de que formData contenga el valor de PID
      formData.nombre,
      formData.apellidoPaterno,
      formData.apellidoMaterno,
      formData.telefono,
      formData.sexo,
      formData.direccion,
      formData.fecha,
      formData.ingreso
    ],
    (error, results) => {
      if (error) {
        console.error('Error al realizar el INSERT en la tabla "paciente":', error);
        res.sendStatus(500);
      } else {
        console.log("Inserción exitosa");
        res.sendStatus(200);
      }
    }
  );
}


async function GetTablePacientes(req, res){
  try {
    const result = await connection.query('SELECT * FROM paciente');
    res.json(result.rows); // Devuelve los datos de la tabla como un JSON
  } catch (error) {
    console.error('Error al obtener la tabla de pacientes:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

module.exports = {
  InsertarPaciente, GetTablePacientes
};
