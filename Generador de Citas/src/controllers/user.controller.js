const userCtrl = {}
const pool = require ('../database')
//importamos modulo que nos permite usar las funciones de encriptar y comparar
const encript = require('../helpers/handleBcrypt');

//Muestra a todos los usuarios en pantalla
userCtrl.inicio = async (req, res) => {
    try {
        const allUser = await pool.query('SELECT u.*,r.rol FROM usuario AS u, rol_usuario, roles AS r WHERE u.cedula = rol_usuario.id_usuario AND rol_usuario.id_rol = r.id_rol AND u.cedula != ? ORDER BY u.nombre ASC',req.user.cedula)
        //const allUser = await pool.query('SELECT * FROM usuario WHERE cedula != ?',req.user.cedula);
        res.render('users/users',{ allUser});
    } catch (error) {
        console.log(error);
        req.flash('message','a ocurrido un error');
        res.redirect('/usuarios');
    }
    
}

//Elimina al usuario seleccionado
userCtrl.delete = async(req,res) =>{
    const{id} = req.params;
    try {
        //DELETE FROM `usuario` WHERE `usuario`.`cedula` = 1709989352
        await pool.query('DELETE FROM usuario WHERE cedula = ?',[id])
        req.flash('success','El usuario se elimino correctamente');
        res.redirect('/usuarios');
    } catch (error) {
        req.flash('message','Ocurrio un error al eliminar el usuario');
        console.log(error);
        res.redirect('/usuarios');
    }

}

//Edita a un usuario seleccionado --- GET
userCtrl.editG = async(req,res) =>{
    const {id} = req.params;
    try {
        const oneUser = await pool.query('SELECT u.*,r.rol FROM usuario AS u, rol_usuario, roles AS r WHERE u.cedula = rol_usuario.id_usuario AND rol_usuario.id_rol = r.id_rol AND u.cedula = ?',[id]);
        //console.log(oneUser);
        res.render('users/edit',{oneUser: oneUser[0]});
    } catch (error) {
        console.log(error)
        req.flash('message','Ocurrio un error al llamar al usuario')
        res.redirect('/usuarios');
    }
} 

//Edita a un usuario  --- POST
userCtrl.editP = async(req,res) =>{
    const {id} = req.params;
    //guarda los objetos del metodo post
    const { nombre, apellido, cedula, correo, telefono, sexo, rol} = req.body;

    const newUser = {
        nombre,
        apellido,
        cedula,
        correo,
        telefono,
        sexo,
    }
    let newRol = {
        rol
    }
    try {
        //Actualiza la tabla de roles
        if(rol.length>1){
            const temp = await pool.query('SELECT rol_usuario.id_rol FROM rol_usuario, roles WHERE roles.rol = ? AND roles.id_rol = rol_usuario.id_rol',rol);
            newRol.rol = temp[0].id_rol;
        }
        await pool.query('UPDATE rol_usuario SET id_rol = ? WHERE id_usuario = ?',[newRol.rol,id]);

        //Actualiza la taba de usuarios
        await pool.query('UPDATE usuario SET ? WHERE cedula = ?',[newUser,id]);
        

        req.flash('success','Los datos se actualizaron con exito');
        res.redirect('/usuarios');

    } catch (error) {
        console.log(error);
        req.flash('message','Ocurrio un error al editar los datos');
        res.redirect('/usuarios');
    }
}

//añade nuevos usuarios --- Admin
userCtrl.addG = (req,res) =>{
    res.render('users/add');
}
userCtrl.addP = async(req,res) =>{
    //obtenemos los datos del body (formulario)
    const {nombre, apellido, cedula, correo, telefono, clave, nacimiento, sexo, rol} = req.body;
    //almacenamos los datos en un objeto
    let newUser = {
        nombre,
        apellido,
        cedula,
        correo,
        telefono,
        clave,
        nacimiento,
        sexo
    }
    //llenamos sexo en caso de que este no sea definido
    if(newUser.sexo===undefined){
        nuevoUsuario.sexo='Otros';
    }
    //Encriptamos la clave del usuario
    newUser.clave = await encript.encriptarPassword(clave);
    //Almacenamos los datos en al base de datos
    try {
        await pool.query('INSERT INTO usuario SET ?',newUser);
        await pool.query('INSERT INTO rol_usuario (id_rolUsuario,id_usuario,id_rol) VALUES (null,?,?)',[newUser.cedula,rol]);
        req.flash('success','Se añadieron con exito los datos');
        res.redirect('/usuarios');
    } catch (error) {
        req.flash('message','Ocurrio un error al guardar los datos')
        res.redirect('/usuarios/add');
    }
}

userCtrl.searchG = (req,res) =>{
    res.render('users/search');
}

userCtrl.searchP = async(req,res) =>{
    const { cedula } = req.body;
    try {
        const rows = await pool.query('SELECT u.*,r.rol FROM usuario AS u, rol_usuario, roles AS r WHERE u.cedula = rol_usuario.id_usuario AND rol_usuario.id_rol = r.id_rol AND u.cedula = ? ',[cedula]);
        //guarda el resultado de la base de datos y la envia para procesarla
        res.render('users/result',{resUser:rows[0]});
    } catch (error) {
        req.flash('message','Ocurrio un error al consultar la BD');
        res.redirect('/usuarios/search');
    }
    
}



module.exports = userCtrl;