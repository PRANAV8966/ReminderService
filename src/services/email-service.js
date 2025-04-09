
const Sender = require('../config/email-config');

const TicketRepository = require('../repository/ticket-repository,');

class EmailService {
    constructor() {
        this.repository = new TicketRepository();
    }

    async SendMail(mailFrom, mailTo, subject, mailBody) {
        const info = Sender.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: mailBody
        })
    }

    async getPendingTicket(data) {
        try {
            const response = await this.repository.getPendingTicket(data);
            return response;
        } catch (error) {
            throw error;
        }
        
    }

    async createTicket(data) {
        try {
            const ticket = await this.repository.create(data);
            return ticket;
        } catch (error) {
            throw error;
        }
    }

    async updatePendingTicket(ticketId, data) {
        try {
            const updatedTicket = await this.repository.updatePendingTicket(ticketId, data);
            return updatedTicket;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = {
    EmailService
};