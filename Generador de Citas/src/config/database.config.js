/*almacena la configuracion de mi base de datos*/
module.exports = {
    database: {
        conectionLimit: 20,
        host: 'localhost',
        user: 'root',
        password: process.env.PASSWORD_DB,
        database: 'gecim'
    }
}

