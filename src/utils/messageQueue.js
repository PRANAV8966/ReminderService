const ampqlib = require('amqplib');

const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require('../config/server-config');


const createChannel = async () => {
    try {
        const connection = await ampqlib.connect(MESSAGE_BROKER_URL);
        const channel =  await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
        return channel;
    } catch (error) {
        throw error;
    }
}

const subscribeMessage = async (channel, service, binding_key) => {
    try {
        const applicationQueue = await channel.assertQueue('QUEUE_NAME');
     
        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

        channel.consume(applicationQueue.queue, msg => {
            console.log("recieved data");
            const payload = JSON.parse(msg.content.toString());
            
             if (!payload.email) {
                console.error("missing the mail field in the payload");
                channel.ack(msg);
                return ;
             }
            let email = {
                    subject:'Flight Confirmination status',
                    content:'your flight was successfully booked with the folllowing credentials',
                    recepientEmail: payload.email,
                    notificationTime: new Date((new Date()).getTime() + (4.6 * 60 * 60000))
                }         
            if (true) {
                console.log('called the email service');
                service.createTicket(email);
                channel.ack(msg);
            }
            
        })
    } catch (error) {
        throw error;
    }
}

const publishMessage = async (channel, binding_key, message) => {
    try {
        await channel.assertQueue('QUEUE_NAME');
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));

    } catch (error) {
        throw error;
    }
}


module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage
}