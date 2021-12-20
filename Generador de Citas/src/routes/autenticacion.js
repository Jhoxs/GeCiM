const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');



//registrarse
router.get('/registro',(req,res)=>{
    res.render('auth/registro',{title:'registro'});
});

router.post('/registro', passport.authenticate('local.registro',{
    successRedirect: '/inicio',
    failureRedirect: '/registro',
    failureFlash: true
}));


//logear
router.get('/login',(req,res)=>{
    res.render('auth/login',{title:'login'});
});

router.post('/login',(req,res,next)=>{
    //Valida que el correo sea ingresado
    //req.check('correo','El correo es requerido').notEmpty();
    //req.check('clave','La contraseña es requerida').notEmpty();
    //const errores = req.ValidationErrors();
    //hace un conteo de los errores
    /*if(errores.length > 0){
        req.flash('message',errores[0].msg);
        res.redirect('/login');
    }*/
    passport.authenticate('local.login',{
        successRedirect: '/inicio',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res,next);
});

//cerrar sesion
router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/');
});


router.get('/inicio', isLoggedIn, (req, res) => {
    res.render('inicio');
});



module.exports = router;