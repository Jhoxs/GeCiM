const nodemailer = require('nodemailer');
const {google} =require('googleapis');

//funcion encargada de generar los tokens
const accessToken = async() =>{
    const oAuth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    );
    oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN});
    return await oAuth2Client.getAccessToken();
}

//funcion para enviar mail
const enviarCorreo = async(mailOptions) =>{
    try {
        const transporter = nodemailer.createTransport({
            service:"gmail",
                auth:{
                    type:"OAuth2",
                    user:process.env.USER_ACCOUNT,
                    clientId:process.env.CLIENT_ID,
                    clientSecret:process.env.CLIENT_SECRET,
                    refreshToken:process.env.REFRESH_TOKEN,
                    accessToken: accessToken(),
                }
        })
        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.log(error);
    }
}

/*
const mailOptions = {
    from: "Gestor de Citas Médicas <gecimpruebas@gmail.com>",
    to: "joxshernandez@gmail.com",
    subject:"Este es un email de prueba",
    text: "Estamos provando como enviar un email"
}
*/




module.exports = {enviarCorreo};