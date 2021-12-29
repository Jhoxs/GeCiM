const pruebas = {}
const pool = require('../database')
pruebas.crearDatos = async() =>{
    let newPrueba = {
        nombre : 'Admin',
        apellido : 'Admin',
        cedula : '1111111111',
        correo : 'admin@admin.com',
        telefono : '1111111111',
        clave : 'admin1',
        nacimiento : '1111-11-11',
        sexo : 'Hombre'
    }
    //console.log(newPrueba);
    const newRol = await pool.query('SELECT roles.rol FROM usuario, rol_usuario, roles WHERE rol_usuario.id_usuario = usuario.cedula AND rol_usuario.id_rol = roles.id_rol AND usuario.cedula = ?','1727621946');
    Object.assign(newPrueba,{rol:newRol[0].rol});
    console.log('--------------');
}

module.exports = pruebas;