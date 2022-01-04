const profCtrl = {}
const pool = require('../database')
const { DateTime } = require('luxon');


//toISOString() nos presenta en un formato ISO
//toLocaleDateString() nos presenta en un formato dd/mm/aa

//metodo get para obtener el perfil del usuario
profCtrl.renderProf = async(req,res) =>{
    try {
        const perfil = await pool.query('SELECT * FROM usuario WHERE cedula = ?',req.user.cedula);
        
        //uso de luxon para dar formato a la fecha
        let newFecha = perfil[0].nacimiento.toISOString();
        newFecha = DateTime.fromISO(newFecha).setLocale('es-ES').toFormat('dd LLLL yyyy');
        Object.assign(perfil[0],{newFecha:newFecha});

        //guarda el nacimiento en formato dd/mm/aa para un posterior uso
        perfil[0].nacimiento = perfil[0].nacimiento.toLocaleDateString();
        res.render('profile/perfil',{perfil:perfil[0]});
    } catch (error) {
        if(error instanceof TypeError){
            //Cierra sesion en caso de que el administrador haya modificado los datos
            console.log(error);
            req.flash('message','Vuelve a iniciar session');
            res.render('profile/errP');
        }else{
            req.flash('message','Ocurrio un error al mostrar tus datos');
            res.redirect('/inicio');
        }
    }
}


//metodo get para editar el perfil del usuario ----
profCtrl.renderProfEditG = async(req,res) => {
    try {
        const perfil = await pool.query('SELECT * FROM usuario WHERE cedula = ?',req.user.cedula);
        //Da formato a la fecha para mostrarla en el formulario -- input Date
        let newFecha = perfil[0].nacimiento.toISOString();
        newFecha = DateTime.fromISO(newFecha).setLocale('es-ES').toFormat('yyyy-LL-dd');
        Object.assign(perfil[0],{newFecha:newFecha});
        //Da formato para mostrar en el formulario  -- lable Fecha Nacimiento
        perfil[0].nacimiento = perfil[0].nacimiento.toLocaleDateString();
        res.render('profile/editP',{perfil:perfil[0]});
    }
    catch (error) {
       
        req.flash('message','Ocurrio un error editar tu perfil');
        res.redirect('/perfil');
        
    }
}

profCtrl.renderProfEditP = async(req,res) => {
    try {
        const { nombre, apellido, cedula, correo, telefono, nacimiento, sexo} = req.body;
        
        let profUser = {
            nombre,
            apellido,
            cedula,
            correo,
            telefono,
            nacimiento,
            sexo
        }
        console.log(req.user);
        console.log(profUser);
        //actualiza mis datos en la base de datos
        await pool.query('UPDATE usuario SET ? WHERE cedula = ?',[profUser,req.body.cedulaAct]);
        req.user.cedula = profUser.cedula;
        req.flash('success','Los datos se actualizaron con exito');
        res.redirect('/perfil');
    } catch (error) {
        console.log(error);
        
        req.flash('message','Ocurrio un error editar tu perfil');
        res.redirect('/perfil');
    }
}

module.exports = profCtrl;