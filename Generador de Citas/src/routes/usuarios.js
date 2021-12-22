//estas rutas nos permitiran hacer un crud de usuarios
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('jose');
});


module.exports = router;
