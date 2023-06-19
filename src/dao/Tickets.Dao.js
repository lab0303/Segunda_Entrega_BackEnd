const Tickets = require("./models/Ticket.model");

class TicketDAO {
  async generateTicket(cart) {
    await Tickets.create(cart);
  }
  async getTicket(tid) {
    return await Tickets.findById(tid);
  }
}
module.exports = TicketDAO;
