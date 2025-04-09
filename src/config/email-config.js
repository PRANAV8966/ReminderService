const nodemailer = require('nodemailer');
const { EMAIL_ID, PASSWORD } = require('./server-config')

const Sender = nodemailer.createTransport({
    host: 'smtp.Gmail.com',
    auth: {
        user: EMAIL_ID,
        pass: PASSWORD
    },
})

module.exports = Sender;