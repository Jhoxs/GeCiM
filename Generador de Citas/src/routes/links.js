const express = require('express');
const router = express.Router();
//este pool hace referencia a la conexion en la base de datos
const pool = require('../database');

router.get('/add',(req,res)=>{
    res.send('Prueba Exitosa');
});

module.exports = router;
