const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');


function generarTokenID() {
  return uuidv4();
}


const saltRounds = 10; // Número de rondas de sal para bcrypt, ajusta según sea necesario

async function Login(data) {
  console.log("Email function: "+ data.Email);
  console.log("pass function: "+ data.Password);

  const script = 'SELECT * FROM users WHERE email = $1';
  try {
    const result = await connection.query(script, [data.Email]);

    if (result.rows.length > 0) {
      const storedHashedPassword = result.rows[0].password;
      // Comparar el hash almacenado con la contraseña ingresada
      const isPasswordMatch = await comparePasswords(data.Password, storedHashedPassword);

      if (isPasswordMatch) {
        // Las credenciales son válidas
        return { success: true, message: 'Autenticación exitosa' };
      } else {
        // Las credenciales no son válidas
        return { success: false, message: 'Credenciales incorrectas' };
      }
    } else {
      // El usuario no fue encontrado en la base de datos
      return { success: false, message: 'Usuario no encontrado' };
    }
  } catch (error) {
    console.error('Error al buscar las credenciales de acceso', error);
    return { success: false, error: 'Error de servidor' };
  }
}

// Función para comparar contraseñas utilizando bcrypt
async function comparePasswords(plainPassword, hashedPassword) {
  const bcrypt = require('bcrypt');
  return await bcrypt.compare(plainPassword, hashedPassword);
}



// Función de hash para la contraseña (debes implementar la función hash real)
function hashFunction(password) {
  // Implementar la función de hash adecuada (por ejemplo, bcrypt)
  // Retorna la contraseña hasheada
  // Ejemplo ficticio:
  return hash(password, saltRounds);
}

// Ejemplo ficticio de función de hash con bcrypt (debes instalar el paquete bcrypt)
function hash(password, saltRounds) {
  const bcrypt = require('bcrypt');
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}






module.exports = {
  Login
};
