const authCtrl = {}
const { DateTime } = require('luxon');
const passport = require ('passport');
const {sendMail} = require('../config/nodemailer.config');
const pool = require('../database');

//registro
authCtrl.renderRegistro = (req,res)=>{
    res.render('auth/registro',{title:'registro'});
}

authCtrl.registro = passport.authenticate('local.registro',{
    successRedirect: '/inicio',
    failureRedirect: '/registro',
    failureFlash: true
})

//login
authCtrl.renderLogin = (req,res) =>{
    res.render('auth/login',{title:'login'});
}

authCtrl.login  = passport.authenticate('local.login',{
        successRedirect: '/inicio',
        failureRedirect: '/login',
        failureFlash: true
});


//logout
authCtrl.logout =  (req,res,next) =>{
    req.logOut();
    res.redirect('/');
}

//inicio
authCtrl.inicio = async(req, res) => {
    const dia2 =  DateTime.now().plus({days:2}).toFormat('yyyy-LL-dd');
    const diaAct = DateTime.now().toFormat('yyyy-LL-dd');
    try {
        //verifica si el dia de hoy tiene turno
        const fecha = await pool.query('SELECT fecha_consulta FROM turnos_usuarios WHERE fecha_consulta  = ? AND id_usPac = ?',[diaAct,req.user.cedula]);
        if(fecha.length > 0){
            res.render('inicio',{remember:{msj:'Te recordamos que el dia de hoy tienes tu cita médica'}});
        }else{
            //verifica si el turno es en 3 dias
            const fechaProx = await pool.query('SELECT * FROM turnos_usuarios WHERE fecha_consulta = ? AND id_usPac = ?',[dia2,req.user.cedula]);
            if(fechaProx.length>0){
                res.render('inicio',{remember:{msj:'Te recordamos que tu cita será en 2 dias'}});
            }else{
                res.render('inicio');
            }
        }
    
    } catch (error) {
        console.log(error);
        req.flash('message','Ha ocurrido un error');
        res.render('inicio')
    }
    
}


module.exports = authCtrl;