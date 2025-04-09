const express = require('express');
const app = express();

const  bodyparser  = require('body-parser');

const { PORT }= require('./config/server-config');
const job = require('./utils/jobUtil');
const emailController  = require('./controller/email-controller');

const { createChannel, subscribeMessage } = require('./utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('./config/server-config');
const { EmailService } = require('./services/email-service');
const emailService = new EmailService();


const startAndSetupServer = async () => {
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended:true}));

    const channel = await createChannel();
    console.log('channel created...initiating subcribing messages');
    subscribeMessage(channel, emailService, REMINDER_BINDING_KEY);

    app.listen(PORT, () => {
        console.log(`server started on ${PORT}`);
    })

    app.post('/api/v1/tickets', emailController.create);
    app.get('/api/v1/pendingtickets', emailController.getPendingTicket);
    job();
}

startAndSetupServer();
