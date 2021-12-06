const express = require ('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require ('path');
const app = express();



//llamada a la BD
const { database } = require('./keys');

//Configuraciones
app.set('port', process.env.PORT||3000);
app.set('views', path.join(__dirname, '/views'));
//implementacion con plantillaa hbs -- pendiente
/*app.engine('html',require('hbs').renderFile);
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs')
*/
//implementacion con plantilla ejs
app.engine('html',require('ejs').renderFile);
app.set('view engine','ejs');


//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Variables Globales
app.use((req,res,next) => {
    next();
});


//Rutas
app.use(require('./routes/'));
app.use(require('./routes/autenticacion'));
app.use('/links',require('./routes/links'));


//StaticFiles
app.use(express.static(path.join(__dirname,'public')));


//Servidores de escucha
app.listen(app.get('port'), () => {
    console.log('Server on port',app.get('port'));
});
