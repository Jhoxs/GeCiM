const pruebas = {}
const pool = require('../database')
const nodemailer = require('nodemailer');
const {enviarCorreo} =require('../config/nodemailer.config');
const { DateTime } = require('luxon');

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
    //const newRol = await pool.query('SELECT roles.rol FROM usuario, rol_usuario, roles WHERE rol_usuario.id_usuario = usuario.cedula AND rol_usuario.id_rol = roles.id_rol AND usuario.cedula = ?','1727621946');
    //Object.assign(newPrueba,{rol:newRol[0].rol});
    const mailOptions = {
        from: "Gestor de Citas Médicas <gecimpruebas@gmail.com>",
        to: "somilove28@gmail.com",
        subject:"Este es un email de prueba",
        text: "Estamos provando como enviar un email"
    }

    const dia2 =  DateTime.now().plus({days:2}).toFormat('yyyy-LL-dd');
    console.log(dia2);

    //enviarCorreo(mailOptions).then((result)=>{console.log("Envio exitoso"+result)}).catch((e)=>{console.log("Ocurrio un error al enviar el correo"+e)});
}

module.exports = pruebas;