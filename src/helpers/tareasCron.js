const taskCron = {}

const { DateTime } = require('luxon');
const pool = require('../database');
const {enviarCorreo} =require('../config/nodemailer.config');

taskCron.eliminaTurnos = async() => {
    try {
        const diaActual = DateTime.now().toFormat('yyyy-LL-dd');
        const rows = await pool.query('SELECT * FROM turnos_usuarios AS tu WHERE tu.fecha_consulta < ?',[diaActual]);
        if(rows.length > 0){
            await pool.query('DELETE FROM turnos_usuarios WHERE fecha_consulta < ?',[diaActual]);
            console.log('Los datos se han eliminado con exito');
        }else{
            console.log('La base de datos no encontro turnos antiguos');
        }
    } catch (error) {
        console.log(error);
    }
}


taskCron.enviarCorreos = async() =>{
    try {
        const diaProx = DateTime.now().plus({day:2}).toFormat('yyyy-LL-dd');
        const diaActual = DateTime.now().toFormat('yyyy-LL-dd');
        let correos = [];
        let correosProx = [];
        //verifica si el dia de hoy tiene turno
        const c = await pool.query('SELECT correo FROM turnos_usuarios, usuario WHERE fecha_consulta  = ? AND id_usPac = cedula',[diaActual]);
        if(c.length > 0){
            for(let i in c){
                correos[i] = c[i].correo;
            }
            const fechaAct = DateTime.now().setLocale('es-ES').toFormat('dd LLLL yyyy');
            //Estructura del email cuando es el dia de hoy
            contentHTML = `
                <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 0">
                            <img style="padding: 0; display: block" src="https://i.postimg.cc/MHc3KVmX/Logo.jpg" width="100%">
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #ecedf0">
                            <div style="color: #011126; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                                <h2 style="color: #0F4459; margin: 0 0 7px">Saludos Paciente</h2>
                                <p style="margin: 2px; font-size: 15px">
                                    Este mensaje es para recordarte que la cita que has registrado en el sistema es el día de <b>HOY</b>.<br>La fecha de la cita es el ${fechaAct}.
                                    <br>
                                    <hr style="margin-top: 30px;">
                                    *Te recordamos que no es necesario responder este mensaje.
                                </p>
                                
                                <div style="width: 100%; text-align: center; margin-top: 40px;">
                                    <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db" href="http://192.168.100.89:3000/inicio">Ir a la página</a>	
                                </div>
                                <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Gecim 2022</p>
                            </div>
                        </td>
                    </tr>
                </table>
            `
            const mailOptions = {
                from: "Gestor de Citas Médicas <gecimpruebas@gmail.com>",
                to: correos,
                subject:"Recodatorio",
                html: contentHTML
            }
            //Aqui se envia el email
            enviarCorreo(mailOptions)
            .then((result)=>{console.log('Envio exitoso del correo actual')})
            .catch((e)=>{console.log(e)});
        }
        //verifica si el turno es en 2 dias
        const cProx = await pool.query('SELECT correo FROM turnos_usuarios, usuario WHERE fecha_consulta  = ? AND id_usPac = cedula',[diaProx]);
        if(cProx.length>0){
            for(let i in cProx){
                correosProx[i] = cProx[i].correo;
            }
            const fechaProx = DateTime.now().plus({day:2}).setLocale('es-ES').toFormat('dd LLLL yyyy');
            //Estructura del email cuando falten 2 dias para la cita
            contentHTML = `
                <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 0">
                            <img style="padding: 0; display: block" src="https://i.postimg.cc/MHc3KVmX/Logo.jpg" width="100%">
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #ecedf0">
                            <div style="color: #011126; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                                <h2 style="color: #0F4459; margin: 0 0 7px">Saludos Paciente</h2>
                                <p style="margin: 2px; font-size: 15px">
                                    Este mensaje es para recordarte que la cita que has registrado en el sistema se aproxima en unos días, la cita registrada es el día <b>${fechaProx}</b>.
                                    <br>
                                    <hr style="margin-top: 30px;">
                                    *Te recordamos que no es necesario responder este mensaje.
                                </p>
                                
                                <div style="width: 100%; text-align: center; margin-top: 40px;">
                                    <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db" href="http://192.168.100.89:3000/inicio">Ir a la página</a>	
                                </div>
                                <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Gecim 2022</p>
                            </div>
                        </td>
                    </tr>
                </table>
            `
            const mailOptions = {
                from: "Gestor de Citas Médicas <gecimpruebas@gmail.com>",
                to: correosProx,
                subject:"Recodatorio",
                html: contentHTML
            }
            //Aqui se envia el email
            enviarCorreo(mailOptions)
            .then((result)=>{console.log('Envio exitoso del correo Proximo ')})
            .catch((e)=>{console.log(e)});
        }
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = taskCron;