const taskCron = {}

const { DateTime } = require('luxon');
const pool = require('../database');

taskCron.eliminaTurnos = async() => {
    try {
        const diaActual = DateTime.now().toFormat('yyyy-LL-dd');
        const rows = await pool.query('SELECT * FROM turnos_usuarios AS tu WHERE tu.fecha_consulta < ?',[diaActual]);
        if(rows.length > 0){
            await pool.query('DELETE FROM turnos_usuarios WHERE fecha_consulta < ?',[diaActual]);
            console.log('Los datos se han eliminado con exito');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = taskCron;