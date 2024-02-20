const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');

function generarID() {
  return uuidv4();
}

// Función para agregar una nueva cepa
async function addCultivo(req, res, data) {
    const cultivo_id = generarID(); // Generar un nuevo ID para la cepa
    const { cepa_id, nombre, motivo } = data; // Obtener los datos de la cepa desde la solicitud
    const addCultivoScript = 'INSERT INTO cultivos (id, nombre, cepa_id, motivo) VALUES ($1, $2, $3, $4)';
    
    try {
        // Ejecutar la consulta para agregar la cepa a la tabla "cepas"
        await connection.query(addCultivoScript, [cultivo_id, nombre, cepa_id, motivo]);
        res.status(201).json({ message: 'Cultivo creado correctamente', cultivo_id: cultivo_id });
    } catch (error) {
        console.error('Error al agregar la cepa', error);
        res.status(500).json({ error: 'Error de servidor al agregar la cepa' });
    }
}

// Función para editar una cepa existente
async function editCultivo(req, res, data, id) {
    const { nombre, origen, medio } = data; // Obtener los nuevos datos de la cepa desde la solicitud
    const editCepaScript = 'UPDATE cepas SET nombre = $1, origen = $2, medio = $3 WHERE id = $4';
    
    try {
        // Ejecutar la consulta para editar la cepa en la tabla "cepas"
        await connection.query(editCepaScript, [nombre, origen, medio, id]);
        res.status(200).json({ message: 'Cepa editada correctamente', cepa_id: id });
    } catch (error) {
        console.error('Error al editar la cepa', error);
        res.status(500).json({ error: 'Error de servidor al editar la cepa' });
    }
}

// Función para eliminar una cepa existente
async function deleteCultivo(req, res, cepa_id) {
    const deleteCepaScript = 'DELETE FROM cepas WHERE id = $1';
    
    try {
        // Ejecutar la consulta para eliminar la cepa de la tabla "cepas"
        await connection.query(deleteCepaScript, [cepa_id]);
        res.status(200).json({ message: 'Cepa eliminada correctamente', cepa_id: cepa_id });
    } catch (error) {
        console.error('Error al eliminar la cepa', error);
        res.status(500).json({ error: 'Error de servidor al eliminar la cepa' });
    }
}

// Función para obtener información de una cepa
async function getCultivo(req, res, cepa_id) {
    const getCepaScript = 'SELECT * FROM cepas WHERE id = $1';
    
    try {
        // Ejecutar la consulta para obtener información de la cepa de la tabla "cepas"
        const result = await connection.query(getCepaScript, [cepa_id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]); // Devolver la información de la cepa encontrada
        } else {
            res.status(404).json({ error: 'Cepa no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener información de la cepa', error);
        res.status(500).json({ error: 'Error de servidor al obtener información de la cepa' });
    }
}

// Función para obtener todas las cepas
async function getAllCultivos(req, res, user_id) {
    const getAllCepasScript = 'SELECT * FROM cepas WHERE user_id = $1';
    
    try {
        // Ejecutar la consulta para obtener todas las cepas de la tabla "cepas"
        const result = await connection.query(getAllCepasScript, [user_id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows); // Devolver todas las cepas encontradas
        } else {
            res.status(404).json({ message: 'No se encontraron cepas en la base de datos' });
        }
    } catch (error) {
        console.error('Error al obtener todas las cepas', error);
        res.status(500).json({ error: 'Error de servidor al obtener todas las cepas' });
    }
}


  module.exports = {
    addCultivo,
    editCultivo,
    deleteCultivo,
    getCultivo,
    getAllCultivos
  };