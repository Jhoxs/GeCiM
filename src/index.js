const express = require ('express');
const morgan = require('morgan');
const path = require ('path');
const { engine } = require('express-handlebars');
//Modulo encargado de las sesiones de usuario
const passport = require('passport');
//Modulo que permite mostrar notificaciones
const flash = require('connect-flash');
const bodyParser = require('body-parser')
//Modulos para crear sesion en una bd
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
//Modulo para agregar taeras al servidor
const cron = require('node-cron');
const taskCron = require('./helpers/tareasCron');
//--llamada a la BD
//config almacena la informacion de mi base de datos
const iniciadorRoles =require('./lib/iniRolUsers');
const { database } = require('./config/database.config');
const sessionStore = new MySQLStore(database);
//CREA VARIABLES DE ENTORNO
require('dotenv').config();



//--pruebas
//const pruebas =require('./lib/tester');
//pruebas.crearDatos();

//--inicializadores
const app = express();
require('./lib/passport');
iniciadorRoles.iniciar();

//--Configuraciones
app.set('port', process.env.PORT||3000);
app.set('views', path.join(__dirname, '/views'));
//implementacion con plantillaa hbs
app.engine('hbs', engine ({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./helpers/handlebars')
}))
app.set('view engine', 'hbs');


//--Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//crea una sesion local
app.use(
    session({
      key: 'session_cookie_name',
      secret: "Josemysqlnodemysql_cookie_secret",
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  );
//flash nos permite usar alertas en caso de algun error 
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


//--Variables Globales
app.use((req,res,next) => {
    //hace uso de la libreria flash para mandar mensajes de confirmacion, u otros mensajes
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});

//--Acciones programadas por el servidor
//Erecuta cada 20s -> */20 * * * * *
//Ejecutará esta accion una vez al dia -- Horario de ejecucion 00:00 
//0 0 * * *
cron.schedule('0 0 * * *',()=>{
  console.log('Tarea Programada');
  taskCron.eliminaTurnos();
  taskCron.enviarCorreos();
  
});

//--Rutas
app.use(require('./routes/index'));
app.use(require('./routes/autenticacion'));
app.use('/turnos',require('./routes/turnos'));
app.use('/usuarios',require('./routes/usuarios'));
app.use('/perfil',require('./routes/perfil'));


//--StaticFiles (public)
app.use(express.static(path.join(__dirname,'public')));





//--Servidores de escucha
app.listen(app.get('port'), () => {
    console.log('Server on port',app.get('port'));
});
