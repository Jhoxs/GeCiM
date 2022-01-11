//importamos el modulo check
const { check } = require("express-validator");
const { validateResult} = require("../helpers/validateHelper");
//lamada a la base de datos
const pool = require('../database');
//creamos el objeto para validar turnos
const valTurno = {};


valTurno.verificaTurno = [
    check('horaInicio')
        .notEmpty()
        .withMessage('Debe ingresar una fecha de inicio')
        .matches(/[0-9]\S:[0-9]\S/)
        .withMessage('Solo se admiten horas con minutos')
        .isLength({max:8})
        .withMessage('Este tiempo no es valido')
    ,
    check('horaFin')
        .notEmpty()
        .withMessage('Debe ingresar una fecha de Fin')
        .custom((value,{req})=>{
            if(value<= req.body.horaInicio){
                throw new Error ('La hora de fin debe ser mayor a la de inicio');
            }
            return true;
        })
        .matches(/[0-9]\S:[0-9]\S/)
        .withMessage('Solo se admiten horas con minutos')
        .isLength({max:8})
        .withMessage('Este tiempo no es valido')
    ,
    check('dias')
        .notEmpty()
        .withMessage('Debe seleccionar al menos un dia')
        .custom(async(value,{req})=>{
            const  {horaInicio,horaFin,dias} = req.body;
            const turno = await pool.query('SELECT * FROM turnos WHERE inicio_turno <= ? AND fin_turno >= ?',[horaInicio,horaFin]);
            //busca la existencia de un turno
            if(turno.length>0){
            //si existe busca existencia de los dias
                //--si solo se ingresa un dia
                if(typeof value === 'string'){
                    const turnoDias = await pool.query('SELECT turnos_dias.dia_turno FROM turnos, turnos_dias WHERE turnos_dias.id_turno = ? AND turnos_dias.dia_turno = ?',[turno[0].id_turno,dias]);
                    //si existen dias entonces manda un error
                    if(turnoDias.length>0){
                        throw new Error ('Ya existe un turno asignado a este dia');
                    }else{
                        return true;
                    }
                }
                //--si se ingresan mas de un dia
                if(typeof value === 'object'){
                    let turnoDias,contDias=0;
                    let errDias = [];
                    for(let i in value){
                        turnoDias =  await pool.query('SELECT turnos_dias.dia_turno FROM turnos, turnos_dias WHERE turnos_dias.id_turno = ? AND turnos_dias.dia_turno = ?',[turno[0].id_turno,value[i]]);
                        if(turnoDias.length>0){
                            contDias++; 
                            errDias[i] = value[i];
                        } 
                    }
                    if(contDias>0) throw new Error ('Ya existen turnos asignados a estos dias: '+errDias);
                    return true;
                }
            }else{
                return true;
            }
        })
    ,
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

valTurno.editaTurno = [
    check('horaInicio')
        .notEmpty()
        .withMessage('Se encuntra vacia la hora de incio')
        .matches(/[0-9]\S:[0-9]\S/)
        .withMessage('Solo se admiten horas con minutos')
        .isLength({max:8})
        .withMessage('Este tiempo no es valido')
        .custom(async(value,{req})=>{
            const {id} = req.params;
            const {horaInicio} = req.body;
            //verifica si el turno ingresado es identico al de la base de datos
            const idOrig = await pool.query('SELECT * FROM turnos WHERE id_turno = ?',[id]);
            if(idOrig[0].inicio_turno === horaInicio){
                return true;
            }else{
                //Si no es igual, busca turnos que ya existan en la base de datos
                const rows = await pool.query('SELECT * FROM turnos WHERE inicio_turno<= ? AND ?< fin_turno',[value,value]);
                if(rows.length>0){
                    throw new Error('La hora de inicio ya existe');
                }else{
                    return true;
                }
            }
        })
    ,
    check('horaFin')
        .notEmpty()
        .withMessage('Debe ingresar una fecha de Fin')
        .custom(async(value,{req})=>{
            const {id} = req.params;
            const {horaInicio,horaFin} = req.body;
            const idOrig = await pool.query('SELECT * FROM turnos WHERE id_turno = ?',[id]);
            if(idOrig[0].fin_turno === horaFin){
                return true;
            }else{
                const rows = await pool.query('SELECT * FROM turnos WHERE inicio_turno < ? AND ? <= fin_turno',[value,value]);
                if(rows.length>0){
                    throw new Error('Fin del Turno: Ya existe un turno dentro de ese horario');
                }else{
                    return true;
                }
            }
        })
        .custom((value,{req})=>{
            if(value<= req.body.horaInicio){
                throw new Error ('La hora de fin debe ser mayor a la de inicio');
            }
            return true;
        })
        .matches(/[0-9]\S:[0-9]\S/)
        .withMessage('Solo se admiten horas con minutos')
        .isLength({max:8})
        .withMessage('Este tiempo no es valido')
    ,

    (req,res,next) =>{
        validateResult(req,res,next);
    }
];

module.exports = valTurno;