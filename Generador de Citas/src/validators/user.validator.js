//importamos el modulo check
const { check } = require("express-validator");
const { validateResult,validateCedula} = require("../helpers/validateHelper");
//lamada a la base de datos
const pool = require('../database');
//creamos un objeto validacion
const validacion = {};

//validamos la entrada en el login
validacion.validateLogin = [
  check('correo')
    .notEmpty()
    .withMessage('Debe llenar el campo correo.')
    .isEmail()
    .withMessage('El correo ingresado no es valido.')
    .isLength({max:40})
    .withMessage('No se admiten mas de 40 caracteres.')
  ,
  check('clave')
    .notEmpty()
    .withMessage('Debe llenar el campo contraseña.')
    .isLength({max:20})
    .withMessage('No se admite mas de 20 caracteres.')
  ,
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
//validamos el formulario de registro
validacion.validateRegistro = [
  
  check('nombre')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
    .isLength({max:20})
    .withMessage('No se admite mas de 20 caracteres')
  ,
  check('apellido')
    .notEmpty()
    .withMessage('Debe ingresar un apellido')
    .isLength({max:20})
    .withMessage('No se admite mas de 20 caracteres')
  ,//-------Cedula
  check('cedula')
    .custom((value) =>{
      if(validateCedula(value)){
        return true
      }else{
        throw new Error ('La cedula ingresada no es valida');
      }
    })
    .notEmpty()
    .withMessage('Debe ingresar una cedula')
    .isLength({max:10,min:10})
    .withMessage('No se admite mas de 10 caracteres')
    .isNumeric()
    .withMessage('Solo se admiten números')
    //busca datos de la cedula para ver si existen
    .custom(async(value,{req})=>{
      const row = await pool.query('SELECT * FROM usuario WHERE cedula = ?',[value]);
      if(row.length > 0){
        throw new Error ('Esta cedula ya existe');
      }
      return true;
  })
  ,//--------Correo
  check('correo')
    .notEmpty()
    .withMessage('Debe llenar el campo correo.')
    .isEmail()
    .withMessage('El correo ingresado no es valido.')
    .isLength({max:40})
    .withMessage('No se admiten mas de 40 caracteres.')
    //busca los datos de correos electrinicos para ver si existen
    .custom(async(value,{req})=>{
      const row = await pool.query('SELECT * FROM usuario WHERE correo = ?',[value]);
      if(row.length > 0){
        throw new Error ('Esta cedula ya existe');
      }
      return true;
  })
  ,//-----Telefono
  check('telefono')
    .notEmpty()
    .withMessage('Debe ingresar un numero telefonico')
    .isNumeric()
    .withMessage('Solo se admiten numeros')
    .isLength({max:10,min:7})
    .withMessage('Numero de caracteres invalido')
    //busca los datos del telefono para ver si existen
    .custom(async(value,{req})=>{
      const row = await pool.query('SELECT * FROM usuario WHERE telefono = ?',[value]);
      console.log('-----Prueba Telefono-----');
      //console.log(row[0]);
      if(row.length > 0){
        throw new Error ('Este telefono ya existe');
      }
      return true;
  })
  ,
  check('clave')
    .notEmpty()
    .withMessage('Debe llenar el campo contraseña.')
    .isLength({min:4,max:20})
    .withMessage('No se admite mas de 20 caracteres.')
    //regexr
    .matches(/\d/)
    .withMessage('La contraseña deebe tener al menos un numero')
  ,
  check('repass').custom((value,{req})=>{
    if(value !== req.body.clave){
      throw new Error ('Las contraseñas no coinciden');
    }
    return true;
  })
  
  ,
  check('nacimiento')
    .notEmpty()
    .withMessage('Debe llenar el campo nacimiento')
  ,
  (req,res,next) =>{
    //console.log(req.body);
    validateResult(req,res,next);
  },
];
/*
Explicacion de algunas funciones validate
.isLength({ min: 5 }) permite establecer un valor maximo o minimo
.notEmplty() evita que los field esten vacios
.isEmail() verifica que se introduzca un email
.withMessage('') especifica un mensaje abajo de una validacion
.matches(/\d/) nos permite implementar Regex
*/


//exportamos el objeto
module.exports = validacion;
