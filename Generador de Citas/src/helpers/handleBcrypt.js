const bcrypt = require('bcryptjs');
const encript = {};

const genSalt = 10;
//funcion encargada de encriptar la informacion que va a entrar a la base de datos
encript.encriptarPassword = async (password) => {
    //gensal es el tamaño de los hash a usar para la encriptacion
    const salt = await bcrypt.genSalt(genSalt);
    //encriptamos el pasword con el hash
    const hash = await bcrypt.hash(password,salt);
    return hash;
};

//comprara el password encriptado con el password de la base de datos
encript.compararPassword = async (password,passGuardado) => {
    try{
       //retornamos la comparacion entre la pass del formulario y la pass de la bd
        return await bcrypt.compare(password, passGuardado);
        //atrapa la excepcion en caso de que exista algun error
    }catch(exception){
        console.log(exception);
    }
};




module.exports = encript;