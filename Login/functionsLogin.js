const connection = require('../../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');


function generarTokenID(){
  return uuidv4();
}

function InsertarPersonal(res, req, data) {

  //Generar token
  const token = generarTokenID();

  //Crear json nuevos
  const dataPersonal = {
    ID: token,
    Nombre: data.Nombre,
    ApellidoPaterno: data.AP,
    ApellidoMaterno: data.AM,
  }

  const accessData= {
    ID: token,
    Email: data.Email,
    Password: data.Pass
  }

  //Enviar datos
  //-------> Tabla personalaccess
  connection.query('INSERT INTO personalaccess SET ?', accessData, (error, results) => {
    if (error) {
      console.error('Error al realizar el INSERT:', error);
      res.status(500).json({ error: 'Ocurrió un error al agregar el usuario' });
    } else {
      res.status(201).json({ message: 'Usuario agregado' });
    }
  });
  //-------> Tabla personalinformation
  connection.query('INSERT INTO personalinformation SET ?', dataPersonal, (error, results) => {
    if (error) {
      console.error('Error al realizar el INSERT:', error);
      res.status(500).json({ error: 'Ocurrió un error al agregar el usuario' });
    } else {
      res.status(201).json({ message: 'Usuario agregado' });
    }
  });
}

 

  module.exports = {
    InsertarPersonal
  }