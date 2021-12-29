const express = require('express');
const router = express.Router();
//este pool hace referencia a la conexion en la base de datos
const pool = require('../database');
const { isLoggedIn } = require('../middleware/auth');
const vRol = require('../helpers/validaRol');

//estas rutas usan /turno/addTurno
router.get('/addTurno',isLoggedIn,vRol.esPaciente,(req,res)=>{
    res.send('Mostrar Turnos');
});

router.get('/verTurno',isLoggedIn,vRol.esPaciente,(req,res)=>{
    res.send('Ver Turnos');
});

module.exports = router;
