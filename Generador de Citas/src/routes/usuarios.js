//estas rutas nos permitiran hacer un crud de usuarios
const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth');
const vRol = require ('../helpers/validaRol');
const userCtrl = require ('../controllers/user.controller');

//primero verifica si esta logeado y luego verifica su rol
router.get('/',isLoggedIn,vRol.esAdmin,userCtrl.inicio);

router.get('/add',isLoggedIn,vRol.esAdmin,userCtrl.add);


module.exports = router;
