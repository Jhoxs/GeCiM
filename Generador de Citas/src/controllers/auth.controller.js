const authCtrl = {}
const passport = require ('passport');
const {check,body} = require('express-validator');

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
authCtrl.inicio = (req, res) => {
    res.render('inicio');
}


module.exports = authCtrl;