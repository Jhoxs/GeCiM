//importamos el modulo check
const { check,body } = require("express-validator");
const { validateResult,validateResultURL,validateResultDoc} = require("../helpers/validateHelper");
//lamada a la base de datos
const pool = require('../database');
const { DateTime } = require("luxon");
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


valTurno.bsqTurno = [
    check('fechaTurno')
        .notEmpty()
        .withMessage('Debe ingresar un valor')
        .isDate()
        .withMessage('El valor debe ser una fecha')
        .isLength({max:15})
        .withMessage('Este dato no es valido')
        .custom((value,{req})=>{
            const fechaAct = DateTime.local().toFormat('yyyy-LL-dd');
            //valida que no ingresen fechas menores a la fecha actual
            if(value < fechaAct) throw new Error('No se pueden registrar turnos antes de la fecha actual: '+fechaAct);
            return true;
        })
    ,
    (req,res,next) =>{
        validateResult(req,res,next);
    }
];
//verifica Add Turno
valTurno.verAddTurno = [
    check('id')
        .isLength({max:30})
        .withMessage('Ocurrio un erro al ingresar los datos')
        .custom((value,{req})=>{
            //verifica que el url entre con un split
            if(value.includes('+')){
                let newValue = value.split('+');
                let regFecha  =  /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/ //formato aceptado yy-mm-dd
                if(newValue[0].length>5) throw new Error('El URL no es valido');
                //valida que el segundo parametro sea una fecha
                if(regFecha.test(newValue[1])){
                    const fechaAct = DateTime.local().toFormat('yyyy-LL-dd');
                    //valida que no ingresen fechas menores a la fecha actual
                    if(newValue[1] < fechaAct) throw new Error('Esta intentando ingresar datos erronos');
                    return true;
                    
                }else{
                    throw new Error('El URL no es valido');
                }
            }else{
                throw new Error('No se encuentra en el parametro especificado');
            }  
        })
        .custom(async(value,{req})=>{
            //verificamos que el usuario no vaya a registrarse en un turno que ya existe
            let newV = value.split('+');
            const rows = await pool.query('SELECT * FROM turnos_usuarios WHERE id_usPac != ? AND fecha_consulta = ? AND id_turno = ?',[req.user.cedula,newV[1],newV[0]]);
            if(rows.length>0) throw new Error('Ya existe un turno en este usuario');
            return true;
        })
    ,

    (req,res,next) =>{
        validateResultURL(req,res,next);
    }
] 

//verifica ver turno
valTurno.verVerTurno = [
    check('id')
        .isLength({max:15})
        .withMessage('No debe existir mas de 10 datos')
        .isNumeric()
        .withMessage('La ruta especificada no existe')
        .custom(async(value,{req})=>{
            //verifica que el doctor este relacionado con el paciente
            const rows = await pool.query('SELECT * FROM turnos_usuarios WHERE id_usDoc = ? AND id_usPac = ?',[req.user.cedula,value])
            if(rows.length>0){
                return true;
            }else{
                throw new Error('El doctor no tiene acceso a estos datos');
            }
        })

    ,

    (req,res,next) =>{
        validateResultDoc(req,res,next);
    }
]


module.exports = valTurno;