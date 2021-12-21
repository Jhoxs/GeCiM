const express = require('express');
const router = express.Router();


//landing
router.get('/' , async (req, res)=>{
    res.render('index',{title:'GeCim'});
});  

module.exports = router;