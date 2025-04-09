const { notificationTicket } = require('../models/index');
const { Op } = require('sequelize');

class TicketRepository {

    async getPendingNotifications() {
        try {
            const response = await notificationTicket.findAll();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async create(data) {
        try {
            console.log('this is data',data);
            const ticket = await notificationTicket.create(data);
            return ticket;
        } catch (error) {
            throw error;
        }
    }

    async getPendingTicket(filter) {
        try {
            const tickets = await notificationTicket.findAll({
                where: {
                    status: filter.status,
                    // [Op.lte] : new Date()
                }
            })
            return tickets;
        } catch (error) {
            throw error;
        }
    }

    async updatePendingTicket(ticketId, data) {
        const ticket = await notificationTicket.findByPk(ticketId);
        if (ticket.status) {
            ticket.status = data.status;
        }
        await ticket.save();
        return ticket;
    }
}

module.exports = TicketRepository;