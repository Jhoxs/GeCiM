const express = require('express');
const router = express.Router();

//registrarse
router.get('/registro',(req,res)=>{
    res.render('auth/registro');
});

//logear--signin
router.get('/login',(req,res)=>{
    res.render('auth/login');
});

module.exports = router;