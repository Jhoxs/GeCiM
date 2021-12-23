//importamos el modulo check
const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");
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
    .withMessage('No se admite mas de 20 caracteres.'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

validacion.validateRegistro = [
  check('nombre')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
    .isLength({max:20})
    .withMessage('No se admite mas de 20 caracteres'),
  check('apellido')
    .notEmpty()
    .withMessage('Debe ingresar un apellido')
    .isLength({max:20})
    .withMessage('No se admite mas de 20 caracteres'),
  check('cedula')
    .notEmpty()
    .withMessage('Debe ingresar una cedula')
    .isLength({max:10,min:10})
    .withMessage('No se admite mas de 10 caracteres')
    .isNumeric()
    .withMessage('Solo se admiten números'),
  check('correo')
    .notEmpty()
    .withMessage('Debe llenar el campo correo.')
    .isEmail()
    .withMessage('El correo ingresado no es valido.')
    .isLength({max:40})
    .withMessage('No se admiten mas de 40 caracteres.'),
  check('telefono')
    .notEmpty()
    .withMessage('Debe ingresar un numero telefonico')
    .isNumeric()
    .withMessage('Solo se admiten numeros'),
  check('clave')
    .notEmpty()
    .withMessage('Debe llenar el campo contraseña.')
    .isLength({max:20})
    .withMessage('No se admite mas de 20 caracteres.'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
  (req,res,next) =>{
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
