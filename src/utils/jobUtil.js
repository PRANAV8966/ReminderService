const cron = require('node-cron');
const { EmailService } = require('../services/email-service');
const emailService = new EmailService();
const Sender = require('../config/email-config');

const setJob = () => {
    cron.schedule('*/2 * * * *', async () => {
        try {
            const response = await emailService.getPendingTicket({status: 'PENDING'});
            response.forEach((email) => {
                Sender.sendMail({
                    to:email.recepientEmail,
                    subject:email.subject,
                    text: email.content
                }, async (err, data) => {
                    if (err) console.log(err);
                    else {
                        console.log('email sent sucessfully',data);
                        await emailService.updatePendingTicket(email.id, {status:'SUCCESS'});
                    }
                })
            })
        } catch (error) {
            console.log('some error occured', error);
            throw error;
        }
    });
}

module.exports = setJob;