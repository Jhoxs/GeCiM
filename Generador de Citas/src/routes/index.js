const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/' , (req, res)=>{
    res.render('index.html');
});

router.get('/registro' , (req, res)=>{   
    res.render('registro.html');
});

router.post('/registro', async (req,res)=>{
    const {nombre, apellido, cedula, correo, telefono, clave,nacimiento,sexo} = req.body;
    //Creamos un objeto en el que se guardan los datos del registro
    const newUsuario = {
        nombre,
        apellido,
        cedula,
        correo,
        telefono,
        clave,
        nacimiento,
        sexo
    }
    console.log(newUsuario);
    //await espera a que termine de realizar esta funcion 
    await pool.query('INSERT INTO usuario set ?', [newUsuario]);
    res.send("Datos Recividos");

});

module.exports = router;