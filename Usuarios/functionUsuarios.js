const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');

function generarTokenID() {
  return uuidv4();
}


async function AddNewUser(req, res, data){
    const script = 'INSERT INTO usuarios (UID, Email, Password, Nombre, ApellidoP, ApellidoM, Telefono, Genero, Cargo, Especialidad) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    const UID = generarTokenID();
    try{
        const result = await connection.query(script, 
            [
                UID,
                data.Email,
                data.Password,
                data.Nombre,
                data.ApellidoP,
                data.ApellidoM,
                data.Telefono,
                data.Genero, 
                data.Cargo,
                data.Especialidad
            ]);
        console.log('Nuevo usuario agregado ' + UID);
        console.log('Usuario: '+data.Email+'\nContraseña: '+data.Password);
        res.status(201).json({mensaje: 'Usuario agregado'});
    }
    catch(error){
        console.error('Error al agregar', error);
        res.status(500).json({error: 'Error de servidor'});
    }
}


module.exports = {
    AddNewUser
}