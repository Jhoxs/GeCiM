const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const authCtrl = require('../controllers/auth.controller');


//registrarse
router.get('/registro',isNotLoggedIn,authCtrl.renderRegistro);
router.post('/registro', authCtrl.registro);

//logear
router.get('/login',isNotLoggedIn,authCtrl.renderLogin);
router.post('/login',authCtrl.login);

//cerrar sesion
router.get('/logout',authCtrl.logout);


router.get('/inicio', isLoggedIn, authCtrl.inicio);



module.exports = router;