//importamos el modulo check
const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");
//creamos un objeto validacion
const validacion = {};

//validamos la entrada en el login
validacion.validateLogin = [
  check('correo')
    .notEmpty()
    .withMessage('Debe llenar el campo correo')
    .isEmail()
    .withMessage('El correo ingresado no es valido')
    .isLength({max:30})
    .withMessage('No se admiten mas de 30 caracteres')
    ,
  check('clave')
    .notEmpty()
    .withMessage('Debe llenar el campo contraseña')
    .isLength({max:20})
    .withMessage('No se adminten mas de 20 caracteres'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
/*
Explicacion de funciones validate
.isLength({ min: 5 }) permite establecer un valor maximo o minimo
.notEmplty() evita que los field esten vacios
.isEmail() verifica que se introduzca un email
.withMessage('') especifica un mensaje abajo de una validacion
.matches(/\d/) nos permite implementar Regex
*/


//exportamos el objeto
module.exports = validacion;
