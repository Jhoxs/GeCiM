const passport = require('passport');
//usado para hacer strategy locales
const LocalStrategy = require('passport-local').Strategy;

//llamada a la base de datos
const pool = require('../database');
//importamos modulo que nos permite usar las funciones de encriptar y comparar
const encript = require('../helpers/handleBcrypt');

//--LOGIN---
//creamos una funcion que nos permite logear con passport
passport.use('local.login', 
new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'clave',
    passReqToCallback: true
}, 
async(req,correo,clave,done)=>{
    //hace la consulta a la base de datos buscando a una persona con el mismo correo
    const rows = await pool.query('SELECT * FROM usuario WHERE correo = ?',[correo]);
    //en caso de que encuentre al menos un correo igual 
    if(rows.length > 0){
        //guarda el correo en la tabla user
        const user = rows[0];
        //valida el password por medio de la funcion que se encuentra en helpers
        const validarPass = await encript.compararPassword(clave,user.clave);
        if(validarPass){
            //si es valido envia el usuario y un mensaje de bienvenida
            done(null,user,req.flash('success','Bienvenido '+user.nombre+' '+user.apellido));
        }else{
            done(null,false,req.flash('message','El password es incorrecto'));
        }
    } else{
        //si no encuentra ningun usuario muestra un mensaje de error
        return done(null,false,req.flash('message','Este usuario no existe'));
    }
    
}));
//---REGISTRO---
//Creamos la funcion que nos permite registrar a un usuario
passport.use('local.registro',new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'clave',
    passReqToCallback: true
}, async(req,correo,clave,done)=>{
    //llamamos a los datos que recibiran del post
    const {nombre, apellido, cedula, telefono,nacimiento,sexo} = req.body;
    //Creamos un objeto donde se guardaran estos datos
    let nuevoUsuario = {
        nombre,
        apellido,
        cedula,
        correo,
        telefono,
        clave,
        nacimiento,
        sexo
    }
    if(nuevoUsuario.sexo===undefined){
        nuevoUsuario.sexo='Otros';
    }
    //Encriptamos la clave del usuario
    nuevoUsuario.clave = await encript.encriptarPassword(clave);

    //Guardamos los datos en la bd
    const resultado = await pool.query('INSERT INTO usuario SET ?',nuevoUsuario);
    //Agregamos el rol por defecto 1 = Paciente
    await pool.query('INSERT INTO rol_usuario (id_rolUsuario,id_usuario,id_rol) VALUES (null,?,?)',[nuevoUsuario.cedula,'1']);
    console.log(resultado);
    console.log('---------');
    console.log(resultado.insertCedula);
    console.log('El usuario se registro en la base de datos');
    return done(null,nuevoUsuario);
}));

//serializacion del usuario
passport.serializeUser((user, done) => {
    //console.log(user);
    done(null, user.cedula);
});

//deserializacion del usuario
passport.deserializeUser(async(cedula, done) => {
    const rows = await pool.query('SELECT * FROM usuario WHERE cedula = ?',[cedula]);
    done(null, rows[0]);
  });