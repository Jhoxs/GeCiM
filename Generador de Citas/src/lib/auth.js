module.exports = {
    isLoggedIn (req,res,next){
        //si esta logeado continua las rutas
        if(req.isAuthenticated()){
            return next();
        }
        //en caso de que no redirecciona a login
        return res.redirect('/login');
    },

    isNotLoggedIn(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }
        //en caso de que no redirecciona a login
        return res.redirect('/inicio');
    }

};