const docTurnoCtrl = {};
const pool = require('../database');
const { DateTime } = require('luxon');

docTurnoCtrl.verTurnoDia = async(req,res) =>{
    try {
        const cedulaDoc = req.user.cedula;
        const fecha = DateTime.now().toFormat('yyyy-LL-dd');
        const fechaEntera = DateTime.now().setLocale('es').toFormat('dd LLLL yyyy');
        const dia = DateTime.now().setLocale('es').weekdayLong;
        const paciente = await pool.query('SELECT u.nombre, u.apellido, u.cedula, t.inicio_turno, t.fin_turno  FROM usuario AS u, turnos_usuarios AS tu, turnos AS t WHERE tu.fecha_consulta = ? AND tu.id_turno = t.id_turno AND tu.id_usPac = u.cedula AND id_usDoc = ? ORDER BY t.inicio_turno ASC',[fecha,cedulaDoc]);

        const turno = {
            fechaEntera,
            dia,
            paciente
        }
        //tener en cuenta que muestra los turnos del doctor que esta logeado
        res.render('turnos/verTurnoDoc',{turno:turno});
    } catch (error) {
        req.flash('message','Ha ocurrido un error');
        console.log(error);
        res.redirect('/inicio');
    }
}

docTurnoCtrl.verInfoPac = async (req,res)=> {
    try {
        const {id} = req.params;
        let paciente = await pool.query('SELECT nombre, apellido, cedula, telefono, nacimiento, sexo FROM usuario WHERE cedula = ?',[id]);
        paciente[0].nacimiento = new DateTime(paciente[0].nacimiento).toString();
        paciente[0].nacimiento = new DateTime(paciente[0].nacimiento).setLocale('es').toFormat('dd LLLL yyyy')
        res.render('turnos/infoTurnoId',{paciente:paciente[0]});
    } catch (error) {
        console.log(error);
        req.flash('message','Ocurrio un error al mostrar los usuarios')
        res.redirect('/turnos/verTurnoDia');
    }
}

module.exports = docTurnoCtrl;