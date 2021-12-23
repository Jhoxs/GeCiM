const mysql = require ('mysql');
const {promisify} = require('util'); //nos permite usar promesas
//pide desde el archivo config en objeto con el nombre database
const { database } = require('./config');

const pool = mysql.createPool(database);

pool.getConnection((err,connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('La conexxion con la base de dato se ha cerrado');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('La base de datos tiene demasiadas conexiones');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('La conexion con la base de datos ha sido rechazada');
        }
    }

    if (connection) connection.release();
    console.log('La BD se ha conectado');
    
    return;
});

//Convertimos a promesas los callbacks
pool.query = promisify(pool.query);


module.exports = pool;