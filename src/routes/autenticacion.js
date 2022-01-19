const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth');
const authCtrl = require('../controllers/auth.controller');
//modulo encargado de validar los datos
const validacion = require('../validators/user.validator');

//registrarse
router.get('/registro',isNotLoggedIn,authCtrl.renderRegistro);
router.post('/registro',validacion.validateRegistro, authCtrl.registro);

//logear
router.get('/login',isNotLoggedIn,authCtrl.renderLogin);
router.post('/login',validacion.validateLogin,authCtrl.login);

//cerrar sesion
router.get('/logout',authCtrl.logout);

//inicio
router.get('/inicio', isLoggedIn, authCtrl.inicio);



module.exports = router;