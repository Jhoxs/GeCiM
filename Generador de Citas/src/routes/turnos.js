const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth');
const vRol = require('../helpers/validaRol');
const turnoCtrl =require('../controllers/turno.controller');
const valTurno = require('../validators/turno.validator');
const docTurnoCtrl = require('../controllers/docTurno.controller');


//---Agendar Turno
//Muestra los turnos disponibles
router.get('/addTurno',isLoggedIn,vRol.esPaciente,turnoCtrl.addTurnoG);
router.post('/addTurno',isLoggedIn,vRol.esPaciente,valTurno.bsqTurno,turnoCtrl.addTurnoP);
//Guarda el turno en la bd
router.get('/addTurno/:id',isLoggedIn,vRol.esPaciente,valTurno.verAddTurno,turnoCtrl.addTurnoId);
//Muestra el turno guardado al usuario
router.get('/verTurno',isLoggedIn,vRol.esPaciente,turnoCtrl.verTurno);
//Elimina el turno guardado del usuario
router.get('/deleteTurno',isLoggedIn,vRol.esPaciente,turnoCtrl.deleteTurno);

//--Mostrar Turnos -- Doctor
router.get('/verTurnoDia',isLoggedIn,vRol.esDoctor,docTurnoCtrl.verTurnoDia);
router.get('/verTurnoDia/:id',isLoggedIn,vRol.esDoctor,valTurno.verVerTurno,docTurnoCtrl.verInfoPac);

//---Gestion de turnos 
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
