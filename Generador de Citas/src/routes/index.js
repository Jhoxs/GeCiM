const express = require('express');
const { isNotLoggedIn } = require('../lib/auth');
const router = express.Router();


//landing
router.get('/' ,isNotLoggedIn, async (req, res)=>{
    res.render('index',{title:'GeCim'});
});  



module.exports = router;