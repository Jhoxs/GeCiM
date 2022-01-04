const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth');
const vRol = require ('../helpers/validaRol');
const profCtrl = require('../controllers/profile.controller');
const validacion = require('../validators/user.validator');

//obtener la pagina de usuarios
router.get('/',isLoggedIn,profCtrl.renderProf);

//modificar el perfil
router.get('/edit',isLoggedIn,profCtrl.renderProfEditG);
router.post('/edit',isLoggedIn,validacion.validaPerfil,profCtrl.renderProfEditP);

module.exports = router;
