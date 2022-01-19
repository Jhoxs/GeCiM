/*almacena la configuracion de mi base de datos*/
module.exports = {
    database: {
        conectionLimit: 20,
        host: process.env.HOST_DB,
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: 'gecim'
    }
}

