const express = require('express');
const app = express();

const  bodyparser  = require('body-parser');

const { PORT }= require('./config/server-config');
const Sender = require('./config/email-config');

const startAndSetupServer = async () => {
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended:true}));

    app.listen(PORT, () => {
        console.log(`server started on ${PORT}`);
    })

    const mailStatus  = async (mailFrom, mailTo, subject, mailBody) => {
        try {
            const info = await Sender.sendMail({
                from: mailFrom,
                to: mailTo,
                subject: subject,
                text: mailBody
    
            })
            console.log('mail Sent successfully', info.messageId);
        } catch (error) {
            console.log('something went wrong while sending the email');
            throw error;
        }
    }

    // mailStatus(
    //    'notificationservice89@gmail.com',
    //    'reddyvilas49@gmail.com',
    //    'this is a testing email subject',
    //    'tested successfully'
    // )
}

startAndSetupServer();