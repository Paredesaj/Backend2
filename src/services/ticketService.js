import Ticket from "../dao/models/Ticket.model.js";

class TicketService {
  async createTicket(data) {
    return await Ticket.create(data);
  }
}

export default new TicketService();
