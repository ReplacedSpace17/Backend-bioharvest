const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');
const globalUID = require('../globalUID'); // Ajusta la ruta correcta a tu módulo

function getUID(uid){
  return uid;
  }
  
  function generarTokenID() {
    return uuidv4();
  }


//Function for Add new user
async function AddUser(req, res, data){
  const ID = generarTokenID();
  const script = 'INSERT INTO usuarios (id, tipo, email, password) VALUES ( $1, $2, $3, $4)';
  try{
      const result = await connection.query(script, 
          [    
              ID,
              data.tipo,
              data.email,
              data.password
          ]);
      console.log('Nuevo usuario tipo:  ' + data.tipo + ' Email: '+ data.email);
      res.status(201).json({mensaje: 'Usuario agregado'});
  }
  catch(error){
      console.error('Error al agregar', error);
      res.status(500).json({error: 'Error de servidor'});
  }
}

//Functions for Eliminar Usuario
async function EliminarUsuario(req, res, id) {
  const script = 'DELETE FROM "usuarios" WHERE "id" = $1';
  try {
    const result = await connection.query(script, [id]);
    if (result.rowCount > 0) {
      console.log('Se eliminó un usuario');
      res.status(200).json({ mensaje: 'Usuario eliminado' });
    } else {
      console.log('No se encontró el Usuario con el ID especificado');
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error de servidor', error);
    res.status(500).json({ error: 'Ocurrió un error' });
  }
}


async function Login(req, res, data) {
  const { email, password } = data;
  try {
    const query = 'SELECT * FROM usuarios WHERE "email" = $1';
    const { rows } = await connection.query(query, [email]);

    if (rows.length === 1) {
      // Usuario encontrado, verificar la contraseña
      const user = rows[0];
      if (user.password === password) {
        // Contraseña coincidente, inicio de sesión exitoso
        console.log("(200) Bienvenido "+user.email);
        res.status(200).json({ message: 'Inicio de sesión exitoso', user});
      } else {
        // Contraseña incorrecta
        console.log("Contraseña incorrecta(401)");
        res.status(401).json({ error: 'Error de autenticación: contraseña incorrecta' });
      }
    } else {
      // No se encontró el usuario
      console.log("Usuario no encontrado(404)");
    
      res.status(404).json({ error: 'Error de autenticación: usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
}






module.exports = {
  AddUser, EliminarUsuario, Login, getUID
};
