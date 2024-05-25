import { Schema, model } from "mongoose";

const TicketSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    ticket_id: { type: String }
})


const Ticket = model("Tickets", TicketSchema);

export default Ticket;