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

//Edita a un usuario seleccionado
userCtrl.editG = async(req,res) =>{
    const {id} = req.params;
    try {
        const oneUser = await pool.query('SELECT u.*,r.rol FROM usuario AS u, rol_usuario, roles AS r WHERE u.cedula = rol_usuario.id_usuario AND rol_usuario.id_rol = r.id_rol AND u.cedula = ?',[id]);
        console.log(oneUser);
        res.render('users/edit',{oneUser: oneUser[0],valAct:oneUser[0].cedula});
    } catch (error) {
        console.log(error)
        req.flash('message','Ocurrio un error al llamar al usuario')
        res.status(500).redirect('/usuarios');
    }
} 


userCtrl.add = (req,res) =>{
    res.send('hola');
}
module.exports = userCtrl;