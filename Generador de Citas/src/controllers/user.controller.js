const userCtrl = {}

userCtrl.inicio = (req, res) => {
    res.render('users/users');
}
userCtrl.add = (req,res) =>{
    res.send('hola');
}
module.exports = userCtrl;