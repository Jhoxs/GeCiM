/*almacena la configuracion de mi base de datos*/
module.exports = {
    database: {
        conectionLimit: 20,
        host: process.env.HOST_DBH,
        user: process.env.USER_DBH,
        password: process.env.PASSWORD_DBH,
        database: 'heroku_1b25d6c38a4783b'
    }
}

