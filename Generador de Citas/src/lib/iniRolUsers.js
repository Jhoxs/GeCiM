const iniciadorRoles = {};
const pool = require("../database");
const encript = require("../helpers/handleBcrypt");

iniciadorRoles.iniciar = async () => {
  try {
    const row = await pool.query("SELECT * FROM roles");
    if (row.length>0)
      return console.log("La BD ya tiene roles asignados");
    //Creamos usuarios para poder ingresar por primera vez
    const newAdmin = {
      nombre : 'Admin',
      apellido : 'Admin',
      cedula : '1111111111',
      correo : 'admin@admin.com',
      telefono : '1111111111',
      clave : await encript.encriptarPassword('admin1'),
      nacimiento : '1111-11-11',
      sexo : 'Hombre'

    }
    const newDoc = {
      nombre : 'Doctor',
      apellido : 'Doctor',
      cedula : '5555555555',
      correo : 'doctor@doctor.com',
      telefono : '2222222222',
      clave : await encript.encriptarPassword('doctor1'),
      nacimiento : '1111-11-11',
      sexo : 'Hombre'

    }
    const newPac = {
      nombre : 'Paciente',
      apellido : 'Paciente',
      cedula : '6666666666',
      correo : 'paciente@paciente.com',
      telefono : '6666666666',
      clave : await encript.encriptarPassword('paciente1'),
      nacimiento : '1111-11-11',
      sexo : 'Hombre'

    }
    //Si no existen crea los tres roles
    await Promise.all([
      pool.query("INSERT INTO roles (id_rol,rol) VALUES (?,?)", [
        "1",
        "paciente",
      ]),
      pool.query("INSERT INTO roles (id_rol,rol) VALUES (?,?)", [
        "2",
        "doctor",
      ]),
      pool.query("INSERT INTO roles (id_rol,rol) VALUES (?,?)", [
        "3",
        "administrador",
      ]),
      //Insertamos los usuarios creados y les asignamos roles
      pool.query('INSERT INTO usuario SET ?',newAdmin),
      pool.query('INSERT INTO usuario SET ?',newDoc),
      pool.query('INSERT INTO usuario SET ?',newPac)
    ]);
    //asigna los roles a los usuarios
    await pool.query('INSERT INTO rol_usuario (id_rolUsuario,id_usuario,id_rol) VALUES (null,?,?)',[newAdmin.cedula,'3']);
    await pool.query('INSERT INTO rol_usuario (id_rolUsuario,id_usuario,id_rol) VALUES (null,?,?)',[newDoc.cedula,'2']);
    await pool.query('INSERT INTO rol_usuario (id_rolUsuario,id_usuario,id_rol) VALUES (null,?,?)',[newPac.cedula,'1']);
    console.log('Se crearon los datos correctamente');
  } catch (error) {
    console.log(error);
  }
  //verifica si existen roles
};

module.exports = iniciadorRoles;
