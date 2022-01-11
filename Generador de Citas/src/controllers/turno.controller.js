const turnoCtrl = {}
const pool = require('../database');

turnoCtrl.listGesTurno = async(req,res) =>{

    try {
        const allTurno = await pool.query('SELECT t.*,td.dia_turno FROM turnos AS t, turnos_dias AS td WHERE t.id_turno = td.id_turno ORDER BY t.inicio_turno ASC');
        //console.log(allTurno);
        res.render('turnos/gesTurno',{allTurno});
    } catch (error) {
        req.flash('message','Ha ocurrido un error al consultar los turnos');
        res.redirect('/inicio');
    }
    

}


turnoCtrl.deleteGesTurno = async(req,res) =>{
    const{id} = req.params;
    
    if(id.includes('+')){//Elimina el turno en base a su dia
        //separa en dos la ruta
        let newId = id.split('+');
        try {
            await pool.query('DELETE FROM turnos_dias WHERE id_turno = ? AND dia_turno = ?',[newId[0],newId[1]]);
            req.flash('success','El turno se elimino con exito');
            res.redirect('/turnos/gesTurno');
        } catch (error) {
            console.log(error);
            req.flash('message','Ocurrio un error al eliminar el turno');
            res.redirect('/turnos/gesTurno');
        }    
    }else{//elimina el turno en base a su id (se eliminan todos los turnos)
        try {
            await pool.query('DELETE FROM turnos WHERE id_turno = ? ',[id]);
            req.flash('success','Los turnos se eliminaron con exito');
            res.redirect('/turnos/gesTurno');
        } catch (error) {
            console.log(error);
            req.flash('message','Ocurrio un error al eliminar los turnos');
            res.redirect('/turnos/gesTurno');
        } 
    }
}

//muestra los turnos para su edicion
//GET
turnoCtrl.editGesTurnoG = async(req,res) =>{
    const {id} = req.params;
    try {
        const turno = await pool.query('SELECT * FROM turnos WHERE id_turno = ?',[id]);
        res.render('turnos/editGesTurno',{turno:turno[0]});
    } catch (error) {
        req.flash('message','Ocurrio un error al mostrar el turno');
        res.redirect('/turnos/gesTurno');
        console.log(error);
    }
    
}
//POST
turnoCtrl.editGesTurnoP = async(req,res) =>{
    const  {horaInicio, horaFin} = req.body;
    const {id} = req.params;
    try {
        await pool.query('UPDATE turnos SET inicio_turno = ? , fin_turno = ? WHERE id_turno = ?',[horaInicio,horaFin,id]);
        req.flash('success','Los datos se actualizaron con exito');
        res.redirect('/turnos/gesTurno');
    } catch (error) {
        console.log(error);
        req.flash('message','Ocurrio un error al editar los datos');
        res.redirect(req.originalUrl);
    }
    
}

//Agrega nuevos turnos
turnoCtrl.addGesTurnoG = (req,res) =>{
    res.render('turnos/addGesTurno');
}
turnoCtrl.addGesTurnoP = async(req,res) =>{
    const  {horaInicio,horaFin,dias} = req.body;
    let newTurno = {
        horaInicio,
        horaFin,
        dias
    };
    try {
        //primero verificamos si existe un turno
        const rows = await pool.query('SELECT * FROM turnos WHERE inicio_turno <= ? AND fin_turno >= ?',[newTurno.horaInicio,newTurno.horaFin]);
        //Si esta tabla existe entonces vamos solo a agreagar los dias a la tabla
        if(rows.length > 0){
            //Cuando solo seleccionamos un dia
            if(typeof dias === 'string'){
                await pool.query('INSERT INTO turnos_dias(id_turnoDias,dia_turno,id_turno) VALUES (null,?,?)',[newTurno.dias,rows[0].id_turno]);
                req.flash('success','El turno fue añadido con exito');
                res.redirect('gesTurno');
            }
            //Si se selecciona varios dias a la vez
            if(typeof dias === 'object'){
                for(let i in newTurno.dias){
                await pool.query('INSERT INTO turnos_dias(id_turnoDias,dia_turno,id_turno) VALUES (null,?,?)',[newTurno.dias[i],rows[0].id_turno]);
                }
                req.flash('success','El turno fue añadido con exito');
                res.redirect('gesTurno');
            } 
            

        }else{
            //en caso de que no exista se creará la nueva tabla
            await pool.query('INSERT INTO turnos(id_turno,inicio_turno,fin_turno) VALUES (null,?,?)',[newTurno.horaInicio,newTurno.horaFin]);
            const myId = await pool.query('SELECT turnos.id_turno FROM turnos WHERE turnos.inicio_turno = ? AND turnos.fin_turno = ?',[newTurno.horaInicio,newTurno.horaFin])
            //Cuando solo existe un dia seleccionado
            if(typeof dias === 'string'){
                
                await pool.query('INSERT INTO turnos_dias(id_turnoDias,dia_turno,id_turno) VALUES (null,?,?)',[newTurno.dias,myId[0].id_turno]);
                req.flash('success','El turno fue añadido con exito');
                res.redirect('gesTurno');

            }
            //Cuando se seleccionaron 2 o mas dias
            if(typeof dias === 'object'){
                for(let i in newTurno.dias){
                    await pool.query('INSERT INTO turnos_dias(id_turnoDias,dia_turno,id_turno) VALUES (null,?,?)',[newTurno.dias[i],myId[0].id_turno]);
                }
                req.flash('success','El turno fue añadido con exito');
                res.redirect('gesTurno');
            }
        }
        
        
    } catch (error) {
        console.log(error);
        req.flash('message','Ha ocurrido un error');
        res.redirect('addGesTurno');
    }
}

module.exports = turnoCtrl;