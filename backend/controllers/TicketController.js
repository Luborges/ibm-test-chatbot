const knex = require('../database/connection');

class TicketController {
    async index (req, res) {
        const { id } = req.body.user;
        
        const tickets = await knex('tickets')
            .where('user_id', String(id))
            .select('tickets.*');

        if (tickets) {
            return res.status(200).send(tickets);
        }
        else {
            return res.status(400).send('No tickets found for that account!');
        }
    }

    async create (req, res) {
        const { message, user } = req.body;
        
        const ticket = {
            description: message,
            date: new Date(),
            status: 'open',
            user_id: user.id,
        }
   
        const insertedId = await knex('tickets').insert(ticket);
    
        const ticket_id = insertedId[0];
        
        ticket.id = ticket_id;

        return res.status(200).send({
            ticket,
        });
    }
}

module.exports = TicketController;