const bcrypt = require('bcryptjs');

const helpers = {};

//funcion encargada de encriptar la informacion que va a entrar a la base de datos
helpers.encriptarPassword = async (password) => {
    //gensal es el tamaño de los hash a usar para la encriptacion
    const salt = await bcrypt.genSalt(10);
    //encriptamos el pasword con el hash
    const hash = await bcrypt.hash(password,salt);
    
    return hash;
};

//comprara el password encriptado con el password de la base de datos
helpers.compararPassword = async (password,passGuardado) => {
    try{
        console.log(passGuardado);
        console.log(password);
        //atrapa la excepcion en caso de que exista algun error
        return await bcrypt.compare(password, passGuardado);
        //return password == passGuardado;
    }catch(exception){
        console.log(exception);
    }
};

module.exports = helpers;