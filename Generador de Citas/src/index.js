const express = require ('express');
const morgan = require('morgan');
const path = require ('path');
const { engine } = require('express-handlebars');
//import {engine} from 'express-handlebars';
const session = require('express-session');
const validator = require('express-validator'); 
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser')



//llamada a la BD
//--keys almacena la informacion de mi base de datos
const { database } = require('./keys');

//inicializadores
const app = express();
require('./lib/passport');

//Configuraciones
app.set('port', process.env.PORT||3000);
app.set('views', path.join(__dirname, '/views'));
//implementacion con plantillaa hbs -- pendiente
app.engine('hbs', engine ({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', 'hbs');

//implementacion con plantilla ejs
//app.engine('html',require('ejs').renderFile);
//app.set('view engine','ejs');


//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//crea una sesion local
app.use(session({
    secret: 'mysqlnodemysql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
  }));
//--nos permite usar alertas en caso de algun error 
app.use(flash());

//app.use(passport.initialize());
//app.use(passport.session());
//app.use(validator());


//Variables Globales
app.use((req,res,next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});


//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/autenticacion'));
app.use('/links',require('./routes/links'));


//StaticFiles (public)
app.use(express.static(path.join(__dirname,'public')));


//Servidores de escucha
app.listen(app.get('port'), () => {
    console.log('Server on port',app.get('port'));
});
