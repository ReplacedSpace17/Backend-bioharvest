const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');
const globalUID = require('../globalUID'); // Ajusta la ruta correcta a tu módulo

function getUID(uid) {
  return uid;
}

function generarTokenID() {
  return uuidv4();
}


//Function para agregar usuarios
async function AddExpediente(req, res, data) {
  const ID = generarTokenID();
  const script = 'INSERT INTO expedientes (id, user_id, nombre, apellidop, apellidom, curp, sexo, foto_url, fotocredencial_url, turno) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';

  try {
    const result = await connection.query(script,
      [
        ID,
        data.user_id,
        data.nombre,
        data.apellidop,
        data.apellidom,
        data.curp,
        data.sexo,
        data.foto_url,
        data.fotocredencial_url,
        data.turno
      ]);
    console.log('Nuevo expediente para ' + data.nombre);
    res.status(201).json({ message: 'Expediente agregado'});
  }
  catch (error) {
    console.error('Error al agregar', error);
    res.status(500).json({ error: 'Error de servidor' });
  }
}

async function GetExpedienteById(req, res, id) {
  const script = 'SELECT * FROM expedientes WHERE user_id = $1';
  try {
    const result = await connection.query(script, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Expediente no encontrado' });
    } else {
      res.status(201).json(result.rows);
    }
  } catch (error) {
    console.error('Error al obtener expediente', error);
    res.status(500).json({ error: 'Error de servidor' });
  }
}

async function DeleteExpedienteById(req, res, id) {
  const script = 'DELETE FROM expedientes WHERE id = $1';
  try {
    const result = await connection.query(script, [id]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Expediente no encontrado' });
    } else {
      res.status(200).json({ message: 'Expediente eliminado exitosamente' });
    }
  } catch (error) {
    console.error('Error al eliminar expediente', error);
    res.status(500).json({ error: 'Error de servidor' });
  }
}

async function UpdateExpedienteById(req, res, id, newData) {
  const script = `
    UPDATE expedientes
    SET user_id = $1, nombre = $2, apellidop = $3, apellidom = $4, 
        curp = $5, sexo = $6, foto_url = $7, fotocredencial_url = $8, turno = $9
    WHERE id = $10
  `;
  try {
    const result = await connection.query(script, [
      newData.user_id,
      newData.nombre,
      newData.apellidop,
      newData.apellidom,
      newData.curp,
      newData.sexo,
      newData.foto_url,
      newData.fotocredencial_url,
      newData.turno,
      id
    ]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Expediente no encontrado' });
    } else {
      res.status(200).json({ message: 'Expediente modificado exitosamente' });
    }
  } catch (error) {
    console.error('Error al modificar expediente', error);
    res.status(500).json({ error: 'Error de servidor' });
  }
}

async function GetAllExpedientes(req, res) {
  const script = 'SELECT * FROM expedientes';
  try {
    const result = await connection.query(script);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'No se encontraron expedientes' });
    } else {
      res.status(200).json(result.rows);
    }
  } catch (error) {
    console.error('Error al obtener expedientes', error);
    res.status(500).json({ error: 'Error de servidor' });
  }
}


async function getInfoEdit(req, res, id) {
  const script = `
    SELECT expedientes.*, usuarios.tipo, usuarios.email
    FROM expedientes
    LEFT JOIN usuarios ON expedientes.user_id = usuarios.id
    WHERE expedientes.user_id = $1;
  `;
  try {
    const result = await connection.query(script, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Expediente no encontrado' });
    } else {
      console.log('Expediente encontrado para editar');
      res.status(201).json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error al obtener expediente', error);
    res.status(500).json({ error: 'Error de servidor' });
  }
}




module.exports = {
  AddExpediente,
  GetExpedienteById,
  DeleteExpedienteById,
  UpdateExpedienteById,
  GetAllExpedientes,
  getInfoEdit
};

