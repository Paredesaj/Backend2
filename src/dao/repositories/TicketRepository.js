const fs = require('fs');
const path = require('path');
const ticketsFile = path.join(__dirname, '../../data/tickets.json');

class TicketRepository {
    async save(ticket) {
        const tickets = JSON.parse(fs.readFileSync(ticketsFile, 'utf-8'));
        tickets.push(ticket);
        fs.writeFileSync(ticketsFile, JSON.stringify(tickets, null, 2));
        return ticket;
    }
}

module.exports = TicketRepository;
