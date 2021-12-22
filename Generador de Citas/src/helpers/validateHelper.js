const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next()

    } catch (err) {
        const errores = validationResult(req).errors;
        
        console.log('----ERRORES-----');
        console.log({errors:err.array()});
        console.log('---------------');
        console.log(errores); 
    
        req.flash('message','No se ingresaron datos');
        res.redirect('/login');

    }
}



module.exports = { validateResult }