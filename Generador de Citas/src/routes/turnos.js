const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth');
const vRol = require('../helpers/validaRol');
const turnoCtrl =require('../controllers/turno.controller');
const valTurno = require('../validators/turno.validator');

//estas rutas usan /turno/addTurno
router.get('/addTurno',isLoggedIn,vRol.esPaciente,(req,res)=>{
    res.render('turnos/addTurno');
});

router.get('/verTurno',isLoggedIn,vRol.esPaciente,(req,res)=>{
    res.render('turnos/verTurno');
});

//gestion de turnos 
router.get('/gesTurno',isLoggedIn,vRol.esAdmin,turnoCtrl.listGesTurno);

router.get('/addGesTurno',isLoggedIn,vRol.esAdmin,turnoCtrl.addGesTurnoG);
router.post('/addGesTurno',isLoggedIn,vRol.esAdmin,valTurno.verificaTurno,turnoCtrl.addGesTurnoP);

module.exports = router;
