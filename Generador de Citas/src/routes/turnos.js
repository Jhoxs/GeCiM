const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth');
const vRol = require('../helpers/validaRol');
const turnoCtrl =require('../controllers/turno.controller');
const valTurno = require('../validators/turno.validator');
const { DateTime } = require('luxon');

//estas rutas usan /turno/addTurno
router.get('/addTurno',isLoggedIn,vRol.esPaciente,(req,res)=>{
    res.render('turnos/addTurno');
});
router.post('/addTurno',isLoggedIn,vRol.esPaciente,(req,res)=>{
    const {fechaTurno} = req.body;
    //obtiene el dia de la fecha
    let dia = DateTime.fromISO(fechaTurno).setLocale('es-ES').weekdayLong;
    console.log(dia);
    let newTurno = {
        fechaTurno,
        dia
    }
    res.render('turnos/addTurno',({turno:newTurno}));
});

router.get('/verTurno',isLoggedIn,vRol.esPaciente,(req,res)=>{
    res.render('turnos/verTurno');
});


//---gestion de turnos 
//lista los turnos
router.get('/gesTurno',isLoggedIn,vRol.esAdmin,turnoCtrl.listGesTurno);
//agrega nuevos turnos
router.get('/addGesTurno',isLoggedIn,vRol.esAdmin,turnoCtrl.addGesTurnoG);
router.post('/addGesTurno',isLoggedIn,vRol.esAdmin,valTurno.verificaTurno,turnoCtrl.addGesTurnoP);


//elimina los turnos 
router.get('/deleteGesTurno/:id',isLoggedIn,vRol.esAdmin,turnoCtrl.deleteGesTurno);

//edita los turnos 
router.get('/editGesTurno/:id',isLoggedIn,vRol.esAdmin,turnoCtrl.editGesTurnoG);
router.post('/editGesTurno/:id',isLoggedIn,vRol.esAdmin,valTurno.editaTurno,turnoCtrl.editGesTurnoP);

module.exports = router;
