const { validationResult } = require('express-validator');
const pool = require('../database');
//funcion encargada de gestionar los errores
const validateResult =  (req, res, next) => {
    try {
        validationResult(req).throw();
        return next()

    } catch (err) {
        const errores = validationResult(req).errors;
        
        console.log('----ERRORES-----');
        console.log(errores);
        //recorre y muestra todos los errores
        for(let i in errores){
            req.flash('message',errores[i].msg);
            //console.log(errores[i].msg);
        }
        //me redirecciona a  la url que obtiene
        console.log("-----URL-----");
        console.log(req.originalUrl);
        res.redirect(req.originalUrl);  
    }
}

//funcion para validar una cedula
const validateCedula = (cedula) =>{
    //comprobar si cumple con los carateres iniciales
    if (typeof(cedula) == 'string' && cedula.length == 10 && /^\d+$/.test(cedula)) {
        
        //Hacemos un arreglo de la cedula, separando sus digitos
        var digitos = cedula.split('').map(Number);
        //Obtenemos sus dos primeros dígitos
        //El códigoProvincia de provincia debe estar entre el rango [1-24] o 30
        var codigoProvincia = digitos[0] * 10 + digitos[1];
        //Se verifica si codigo provincia esta bien y si su tercer digito esta en el rango [1-5] 
        if (codigoProvincia >= 1 && (codigoProvincia <= 24 || codigoProvincia == 30) && digitos[2] < 6) {
            var digito_verificador = digitos.pop();
            //se calcula si el decimo digito es válido 
            var digito_calculado = digitos.reduce(function (valorPrevio, valorActual, indice) {
                return valorPrevio - (valorActual * (2 - indice % 2)) % 9 - (valorActual == 9) * 9;
              }, 1000) % 10;
        return digito_calculado == digito_verificador;
        }
    }
    return false;
}


module.exports = { validateResult , validateCedula}