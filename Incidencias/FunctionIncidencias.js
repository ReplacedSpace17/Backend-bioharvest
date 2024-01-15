const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');

function generarTokenID() {
  return uuidv4();
}



async function addIncidencia(req, res, data) {
    const script = 'INSERT INTO incidencias (id, tipo, subtipo, comentario, foto, user_id, fecha) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const ID = generarTokenID();
    try {
      const result = await connection.query(script, [
        ID,
        data.tipo,
        data.subtipo,
        data.comentario,
        data.foto,
        data.user_id,
        data.fecha
      ]);
      console.log("Incidencia nueva (201) -> " + data.tipo);
      res.status(201).json({ message: 'Incidencia creada exitosamente' });
    } catch (error) {
      console.error('Error al crear la incidencia', error);
      res.status(500).json({ error: 'Error de servidor' });
    }
  }
  


  async function updateIncidencia(req, res, data) {
    const script = 'UPDATE incidencias SET tipo = $1, subtipo = $2, comentario = $3, foto = $4 WHERE id = $5';
    try {
      const result = await connection.query(script, [
        data.tipo,
        data.subtipo,
        data.comentario,
        data.foto,
        data.id,
      ]);
      res.status(200).json({ message: 'Incidencia modificada exitosamente' });
    } catch (error) {
      console.error('Error al modificar la incidencia', error);
      res.status(500).json({ error: 'Error de servidor' });
    }
  }

  
  async function deleteIncidencia(req, res, incidenciaId) {
    const script = 'DELETE FROM incidencias WHERE id = $1';
    try {
      const result = await connection.query(script, [incidenciaId]);
      res.status(200).json({ message: 'Incidencia eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar la incidencia', error);
      res.status(500).json({ error: 'Error de servidor' });
    }
  }

  
  async function getIncidencia(req, res, incidenciaId) {
    const script = 'SELECT * FROM incidencias WHERE id = $1';
    try {
      const result = await connection.query(script, [incidenciaId]);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ error: 'Incidencia no encontrada' });
      }
    } catch (error) {
      console.error('Error al obtener la incidencia', error);
      res.status(500).json({ error: 'Error de servidor' });
    }
  }
  
  async function getAllIncidencia(req, res) {
    const script = 'SELECT * FROM incidencias';
    try {
      const result = await connection.query(script);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows);
      } else {
        res.status(404).json({ error: 'Incidencia no encontrada' });
      }
    } catch (error) {
      console.error('Error al obtener la incidencia', error);
      res.status(500).json({ error: 'Error de servidor' });
    }
  }
module.exports = {
    addIncidencia,
    updateIncidencia,
    deleteIncidencia,
    getIncidencia, getAllIncidencia

}