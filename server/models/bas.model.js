import { Schema, model } from "mongoose";

const BASSchema = new Schema({
    name: { type: String, required: true },
    company_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    company_website: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    acknowledgement_id: { type: String },
    ticket_id: { type: String }
})


const BASTicket = model("BASTicket", BASSchema);

export default BASTicket;