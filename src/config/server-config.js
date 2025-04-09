const dotenv  = require('dotenv');
dotenv.config();

module.exports = {
    PORT:process.env.PORT,
    EMAIL_ID: process.env.EMAIL_ID,
    PASSWORD: process.env.PASSWORD,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY,
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL
}