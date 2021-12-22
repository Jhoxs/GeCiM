const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next()

    } catch (err) {
        //const errors = validationResult(req);
        console.log('----ERRORES-----');
        console.log({errors:err.array()});
        req.flash('message','No se ingresaron datos');
        res.redirect('/login');

    }
}

module.exports = { validateResult }