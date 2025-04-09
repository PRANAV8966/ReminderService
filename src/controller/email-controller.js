const { EmailService }= require('../services/email-service');

const { StatusCodes } = require('http-status-codes');

const EmailController = new EmailService();

const create = async (req, res) => {
        try {
            const ticket = await EmailController.createTicket(req.body);
            return res.status(StatusCodes.CREATED).json({
                data:ticket,
                success:true,
                error:{},
                message: 'successfully registered email for ticket reminder'
            })
        } catch (error) {
            return res.status(500).json({
                data:{},
                success:false,
                error:error,
                message: 'failed to register email for ticket reminder'
            })
        }
    }
const getPendingTicket = async (req, res) => {
    try {
        const pendingNotifications = await EmailController.getPendingTicket(req.body);
        return res.status(StatusCodes.OK).json({
            data:pendingNotifications,
            success:true,
            message: 'successfully fetched pending tickets',
            error:{}
        });
    } catch (error) {
        console.log('some error occured');
        throw error;
    }
}

module.exports = {
    create,
    getPendingTicket
};