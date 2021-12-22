const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const authCtrl = require('../controllers/auth.controller');

const validacion = require('../validators/user.validator');

//registrarse
router.get('/registro',isNotLoggedIn,authCtrl.renderRegistro);
router.post('/registro', authCtrl.registro);

//logear
router.get('/login',isNotLoggedIn,authCtrl.renderLogin);
router.post('/login',validacion.validateLogin,authCtrl.login);

//cerrar sesion
router.get('/logout',authCtrl.logout);


router.get('/inicio', isLoggedIn, authCtrl.inicio);



module.exports = router;