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
        res.status(200).json({message: 'Rondin agregado con éxito'});
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



module.exports = {
    addRondin,
    deleteRondin,
    getAllRondines
}




