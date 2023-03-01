const nodemailer = require ('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
require('dotenv').config();
const {  SENDGRID_API_KEY} = process.env;
const htmlTemplate = require ('../Template/htmlTemplate.js')

const createTrans = () =>{
    //const transport = nodemailer.createTransport({
       // host: "sandbox.smtp.mailtrap.io",
        //port: 2525,
        //auth: {
           // user: "bb54581237f8d6",
           // pass: "010cb0fe129b61"
        //}
    //});
    const transport = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey:SENDGRID_API_KEY
        })
    );

    return transport;
}

const sendMail = async (user) => {
    const transporter =  createTrans()
    const info = await transporter.sendMail({
        from:'"Viator " <viator.contact@gmail.com>',
        to:`${user.email}`,
        subject: `Hola ${user.givenName},Bienvenido a VIATOR`,
        html:htmlTemplate,
    });
    console.log("message send :%s", info.messageId);
    return
}

exports.sendMail= (user) => sendMail(user)