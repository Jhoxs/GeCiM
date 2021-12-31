//estas rutas nos permitiran hacer un crud de usuarios
const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth');
const vRol = require ('../helpers/validaRol');
const userCtrl = require ('../controllers/user.controller');
const validacion = require('../validators/user.validator');

//primero verifica si esta logeado y luego verifica su rol
router.get('/',isLoggedIn,vRol.esAdmin,userCtrl.inicio);

//Agrega nuevos usuarios desde administrador
router.get('/add',isLoggedIn,vRol.esAdmin,userCtrl.add);


//elemina al usuario seleccionado (solo administrador)
router.get('/delete/:id',isLoggedIn,vRol.esAdmin,userCtrl.delete);

//Edita a un usuario
router.get('/edit/:id',isLoggedIn,vRol.esAdmin,userCtrl.editG);
router.post('/edit/:id',isLoggedIn,vRol.esAdmin,validacion.validateEditAdmin,userCtrl.editP);

module.exports = router;
