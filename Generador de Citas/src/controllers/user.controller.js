const userCtrl = {}
const pool = require ('../database')


//muestra a todos los usuarios en pantalla
userCtrl.inicio = async (req, res) => {
    try {

        const allUser = await pool.query('SELECT u.*,r.rol FROM usuario AS u, rol_usuario, roles AS r WHERE u.cedula = rol_usuario.id_usuario AND rol_usuario.id_rol = r.id_rol AND u.cedula != ?',req.user.cedula)
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



userCtrl.add = (req,res) =>{
    res.send('hola');
}
module.exports = userCtrl;