const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');

function generarTokenID() {
  return uuidv4();
}



//Function para crear accesos
async function addRondin(req, res, data){
    const script = 'INSERT INTO rondines (id, user_id, tiempo, fecha) VALUES ($1, $2, $3, $4)';
    const id = generarTokenID(); // Asumiendo que tienes una función para generar un ID único
    try{
        const result = await connection.query(script, 
            [   
                id,
                data.user_id,
                data.tiempo,
                data.fecha
            ]);
        console.log('Nuevo rondin agregado por '+ data.user_id + '\n ID: '+ id);
        res.status(200).json({message: 'Rondin agregado con éxito', id: id, user_id: data.user_id});
    }
    catch(error){
        console.error('Error al agregar rondin', error);
        res.status(500).json({error: 'Error de servidor'});
    }
}

// Function para eliminar rondines
async function deleteRondin(req, res, id) {
    const script = 'DELETE FROM rondines WHERE id = $1';

    try {
        const result = await connection.query(script, [id]);
        console.log('Se eliminó el rondín con ID: ' + id);
        res.status(200).json({ message: 'Rondín eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar rondín', error);
        res.status(500).json({ error: 'Error de servidor' });
    }
}



// Function para obtener todos los rondines con información del guardia
async function getAllRondines(req, res) {
    const script = `
        SELECT rondines.*, usuarios.email as guardia_email
        FROM rondines
        INNER JOIN usuarios ON rondines.user_id = usuarios.id
    `;

    try {
        const result = await connection.query(script);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener los rondines con información del guardia', error);
        res.status(500).json({ error: 'Error de servidor' });
    }
}

/*//////////////////--------------Detralles Rondines*/

async function addDetallesRondin(req, res, data) {
    const script = `
        INSERT INTO detallesRondines 
        ("id_rondin", "user_id", "fecha", "point1", "point2", "point3", "point4", "point5", "point6", "point7", "point8", "point9", "point10") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;

  
    try {
        const result = await connection.query(script, [
            data.id_rondin,
            data.user_id,
            data.fecha,
            data.point1,
            data.point2,
            data.point3,
            data.point4,
            data.point5,
            data.point6,
            data.point7,
            data.point8,
            data.point9,
            data.point10
        ]);

        console.log('Nuevos detalles de rondin agregados para el rondín con ID: ' + data.id_rondin);
        res.status(200).json({ message: 'Detalles de rondín agregados con éxito' });
    } catch (error) {
        console.error('Error al agregar detalles de rondin', error);
        res.status(500).json({ error: 'Error de servidor' });
    }
}

async function deleteDetallesRondin(req, res, id) {
    const script = 'DELETE FROM detallesRondines WHERE "id" = $1';

    try {
        const result = await connection.query(script, [id]);
        console.log('Se eliminaron los detalles de rondín con ID: ' + id);
        res.status(200).json({ message: 'Detalles de rondín eliminados correctamente' });
    } catch (error) {
        console.error('Error al eliminar detalles de rondín', error);
        res.status(500).json({ error: 'Error de servidor' });
    }
}

async function getAllDetallesRondines(req, res) {
    const script = `
        SELECT * FROM detallesRondines
    `;

    try {
        const result = await connection.query(script);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener los detalles de rondines con información del guardia', error);
        res.status(500).json({ error: 'Error de servidor' });
    }
}

async function getDetalleID(req, res, id) {
    const script = `
        SELECT * FROM detallesRondines where id_rondin = $1
    `;

    try {
        const result = await connection.query(script, [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener los detalles de rondines con información del guardia', error);
        res.status(500).json({ error: 'Error de servidor' });
    }
}

//obtener el incidente mas registrados
async function GetMostRegisteredIncidentTypes(req, res) {
    try {
      // Consultar la base de datos para obtener los tipos de incidencias más registrados
      const query = `
        SELECT "tipo", COUNT("tipo") as "Numero_Registros"
        FROM "incidencias"
        
        GROUP BY "tipo"
        ORDER BY "Numero_Registros" DESC
        LIMIT 10; -- Puedes ajustar este límite según tus necesidades
      `;
  
      const result = await connection.query(query);
      console.log('> Obteniendo tipos de incidencias más registrados ✓');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al obtener los tipos de incidencias más registrados:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
  
module.exports = {
    addRondin,
    deleteRondin,
    getAllRondines,
    addDetallesRondin,
    deleteDetallesRondin,
    getAllDetallesRondines,
    getDetalleID,
    GetMostRegisteredIncidentTypes
}




