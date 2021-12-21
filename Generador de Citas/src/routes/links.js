const express = require('express');
const router = express.Router();
//este pool hace referencia a la conexion en la base de datos
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');


router.get('/addTurno',isLoggedIn,(req,res)=>{
    res.send('Mostrar Turnos');
});

router.get('/verTurno',(req,res)=>{
    res.send('Ver Turnos');
});

module.exports = router;
