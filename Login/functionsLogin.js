const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');
const globalUID = require('../globalUID'); // Ajusta la ruta correcta a tu módulo


async function Login(req, res, data) {
  const { Email, Password } = data;

  try {
    const query = 'SELECT * FROM usuarios WHERE "email" = $1';
    const { rows } = await connection.query(query, [Email]);

    if (rows.length === 1) {
      // Usuario encontrado, verificar la contraseña
      const user = rows[0];
      if (user.password === Password) {
        // Contraseña coincidente, inicio de sesión exitoso
        const datos = {uid: user.uid}
        console.log("(200) Bienvenido "+user.email);
        
        

        res.status(200).json({ message: 'Inicio de sesión exitoso', datos});
        return(user.uid);
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

function getUID(uid){
return uid;
}

module.exports = {
  Login,getUID
};
