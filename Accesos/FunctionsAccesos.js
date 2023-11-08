const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');

function generarTokenID() {
  return uuidv4();
}



//Function para crear accesos
async function addAcceso(req, res, data){
    const script = 'INSERT INTO accesos (token, alias, asunto, expiracion, permanente, user_id, status) VALUES ( $1, $2, $3, $4, $5, $6, $7)';
    const token = generarTokenID();
    const status = "Activo";
    try{
        const result = await connection.query(script, 
            [   
                token,
                data.alias,
                data.asunto,
                data.expiracion,
                data.permanente,
                data.user_id,
                status
            ]);
        console.log('Nuevo acceso agregado por  '+ data.user_id + '\n TOKEN: '+ token +'\nStatus: '+ status);
        res.status(200).json({QR: token});
    }
    catch(error){
        console.error('Error al agregar', error);
        res.status(500).json({error: 'Error de servidor'});
    }
}

//Function para crear accesos
async function getAllAccesos(req, res, id){
    const script = 'SELECT * FROM accesos';
    try{
        const result = await connection.query(script, 
            [ 
            ]);
        console.log('Obteniendo accessos (OK)')
        res.status(200).json(result.rows);
    }
    catch(error){
        console.error('Error al agregar', error);
        res.status(500).json({error: 'Error de servidor'});
    }
}


//Function para eliminar accesos
async function deleteAccess(req, res, token){
    const script = 'DELETE FROM accesos WHERE "token" = $1';

    try{
        const result = await connection.query(script, [token]);
        console.log('Se eliminó el acceso: ' + token);
        res.status(200).json({Mensaje: "Se eliminó correctamente"});
    }
    catch(error){
        console.error('Error al agregar', error);
        res.status(500).json({error: 'Error de servidor'});
    }
}

async function validateQR(req, res, token) {
    const script = 'SELECT * FROM accesos WHERE "token" = $1';
    let mensaje = "";

    try {
        const result = await connection.query(script, [token]);

        if (result.rows.length === 0) {
            // Token no encontrado
            res.status(404).json({ error: 'Token no encontrado' });
            return;
        }

        const acceso = result.rows[0];
        
        if (acceso.permanente) {
            mensaje = 'Acceso válido (permanente)';
            console.log('Acceso válido (permanente)');
        } else {
            // Verificar la fecha de expiración
            const currentDate = new Date();
            if (acceso.expiracion && currentDate <= new Date(acceso.expiracion)) {
                mensaje = 'Acceso válido (temporal)';
                console.log('Acceso válido (temporal)');
            } else {
                mensaje = 'Acceso no válido (expirado)';
                console.log('Acceso no válido (expirado)');
            }
        }

        const data = 
        {
            "mensaje": mensaje,
            "alias": result.rows[0].alias,
            "asunto": result.rows[0].asunto,
            "token": result.rows[0].token
           
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Error al validar el token', error);
        res.status(500).json({ error: 'Error de servidor' });
    }
}


module.exports = {
    addAcceso,
    getAllAccesos,
    deleteAccess,
    validateQR
}