const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next()

    } catch (err) {
        const errores = validationResult(req).errors;
        
        console.log('----ERRORES-----');
        for(let i in errores){
            req.flash('message',errores[i].msg);
            console.log(errores[i].msg);
        }
        res.redirect('/login');

    }
}



module.exports = { validateResult }