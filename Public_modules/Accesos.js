const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');

function generarTokenID() {
  return uuidv4();
}

//Function para crear accesos
async function addAcceso(req, res, data){
    const script = 'INSERT INTO Accesos (Alias, Asunto, FechaFinalizacion, Permanente, Usuario_ID, QR_code) VALUES ( $1, $2, $3, $4, $5, $6)';
    const qr = generarTokenID();
    try{
        const result = await connection.query(script, 
            [
                data.Alias,
                data.Asunto,
                data.FechaFinalizacion,
                data.Permanente,
                data.Usuario_ID,
                qr
            ]);
        console.log('Nuevo acceso agregado por  '+ data.Usuario_ID );
        console.log('QR: '+ qr);
        res.status(200).json({QR: qr});
    }
    catch(error){
        console.error('Error al agregar', error);
        res.status(500).json({error: 'Error de servidor'});
    }
}

//Function para editar accesos
async function addAcceso(req, res, data){
    const script = 'INSERT INTO Accesos (Alias, Asunto, FechaFinalizacion, Permanente, Usuario_ID, QR_code) VALUES ( $1, $2, $3, $4, $5, $6)';
    const qr = generarTokenID();
    try{
        const result = await connection.query(script, 
            [
                data.Alias,
                data.Asunto,
                data.FechaFinalizacion,
                data.Permanente,
                data.Usuario_ID,
                qr
            ]);
        console.log('Nuevo acceso agregado por  '+ data.Usuario_ID );
        console.log('QR: '+ qr);
        res.status(200).json({QR: qr});
    }
    catch(error){
        console.error('Error al agregar', error);
        res.status(500).json({error: 'Error de servidor'});
    }
}

//Function para eliminar accesos
async function addAcceso(req, res, data){
    const script = 'INSERT INTO Accesos (Alias, Asunto, FechaFinalizacion, Permanente, Usuario_ID, QR_code) VALUES ( $1, $2, $3, $4, $5, $6)';
    const qr = generarTokenID();
    try{
        const result = await connection.query(script, 
            [
                data.Alias,
                data.Asunto,
                data.FechaFinalizacion,
                data.Permanente,
                data.Usuario_ID,
                qr
            ]);
        console.log('Nuevo acceso agregado por  '+ data.Usuario_ID );
        console.log('QR: '+ qr);
        res.status(200).json({QR: qr});
    }
    catch(error){
        console.error('Error al agregar', error);
        res.status(500).json({error: 'Error de servidor'});
    }
}

//Function para validar accesos
async function validateAccess(req, res, data){
    const script = 'SELECT * FROM Accesos WHERE "qr_code" = $1 ';
    
    try{
        const  { rows } = await connection.query(script, 
            [
                data.QR_code
            ]);


       
    if (rows.length === 1) {
        console.log("Acceso valido");
        res.status(200).json({ message: 'Inicio de sesión exitoso', rows});
      
      } 
      else {
        console.log("Acceso invalido");
        // Contraseña incorrecta
        
        res.status(401).json({ error: 'Error de autenticación: contraseña incorrecta' });
      }
    
       
    }
    catch(error){
        console.error('Error al agregar', error);
        res.status(500).json({error: 'Error de servidor'});
    }
}


module.exports = {
    addAcceso,validateAccess
}