import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  code: { type: String, unique: true, default: () => generateCode() },
  purchase_datetime: { type: Date, default: Date.now },
  amount: Number,
  purchaser: String, // Email del comprador
});

const Ticket = mongoose.model('Ticket', TicketSchema);
export default Ticket;
