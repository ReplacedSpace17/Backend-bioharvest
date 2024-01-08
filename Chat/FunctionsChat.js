const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');

function generarTokenID() {
  return uuidv4();
}

// Function para agregar mensajes al chat
async function addMensaje(req, res, data) {
  const script = 'INSERT INTO chat (mensaje, user_id) VALUES ($1, $2) RETURNING id';

  try {
    const result = await connection.query(script, [data.mensaje, data.user_id]);

    if (result.rows.length === 0) {
      res.status(500).json({ error: 'Error al agregar mensaje' });
    } else {
      const messageId = result.rows[0].id;
      console.log('Nuevo mensaje agregado con ID: ' + messageId);
      res.status(201).json({ message: 'Mensaje agregado exitosamente', messageId });
    }
  } catch (error) {
    console.error('Error al agregar mensaje', error);
    res.status(500).json({ error: 'Error de servidor' });
  }
}

// Function para obtener todos los mensajes del chat
async function getAllMensajes(req, res) {
    const script = `
    SELECT c.id, c.mensaje, c.user_id, u.email
    FROM chat c
    JOIN usuarios u ON c.user_id = u.id;
  `;
  try {
    const result = await connection.query(script);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'No se encontraron mensajes en el chat' });
    } else {
        console.log('Mensajes obtenidos');
      res.status(200).json(result.rows);
    }
  } catch (error) {
    console.error('Error al obtener mensajes del chat', error);
    res.status(500).json({ error: 'Error de servidor' });
  }
}

// Otras funciones para actualizar y eliminar mensajes podrían agregarse según sea necesario

module.exports = {
  addMensaje,
  getAllMensajes
};
