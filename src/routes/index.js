const express = require('express');
const router = express.Router();
const { isNotLoggedIn } = require('../middleware/auth');

//isNotLoggedIn comprueba si alguien no esta logeado
//landing
router.get('/' ,isNotLoggedIn, async (req,res)=>{    
    res.render('index',{title:'GeCim'});
});  




module.exports = router;