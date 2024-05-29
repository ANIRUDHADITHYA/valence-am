import { sendBecomeASupplierUserEmail } from "../email-templets/BecomeASupplier.email.js";
import { sendGetInTouchUserEmail } from "../email-templets/getInTouch.email.js";
import BASTicket from "../models/bas.model.js";
import Ticket from "../models/ticket.model.js";



const generateTicketId = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString(); // 8-digit random number
};

export const createTicket = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    const ticket_id = `GIT-T${generateTicketId()}`;
    const timestamp = Date.now();

    try {
        const ticketCount = await Ticket.countDocuments({ email, timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } });

        if (ticketCount >= 2) {
            return res.status(400).json({ status: false, message: 'Your email has already reached us. please try replying to the acknowledgment email sent you you.' });
        }


        const newTicket = new Ticket({
            name,
            email,
            subject,
            message,
            ticket_id,
            timestamp
        });

        await newTicket.save();

        await sendGetInTouchUserEmail(req.body.email, `Feedback Received - Acknowledgment No: ${ticket_id}`, newTicket);

        return res.status(201).json({ status: true, message: 'Ticket created successfully', ticket_id: ticket_id });
    } catch (error) {
        console.error('Error creating ticket:', error);
        return res.status(500).json({ status: false, message: 'Error creating ticket', error: error.message });
    }
};


export const createBASTicket = async (req, res) => {
    const { name, company_name, email, phone, company_website, message } = req.body;
    const ticket_id = `BAS-T${generateTicketId()}`;
    const timestamp = Date.now();
    const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;

    try {
        const lastTicket = await BASTicket.findOne({ email }).sort({ timestamp: -1 });

        if (lastTicket && (timestamp - lastTicket.timestamp) < sevenDaysInMilliseconds) {
            return res.status(400).json({ status: false, message: 'You can only create a new ticket 7 days after the last one.' });
        }

        const newTicket = new BASTicket({
            name,
            company_name,
            email,
            phone,
            company_website,
            message,
            ticket_id,
            timestamp
        });

        await newTicket.save();

        await sendBecomeASupplierUserEmail(req.body.email, `Application Received - Application No: ${ticket_id}`, newTicket);

        return res.status(201).json({ status: true, message: 'Ticket created successfully', ticket_id: ticket_id });
    } catch (error) {
        console.error('Error creating ticket:', error);
        return res.status(500).json({ status: false, message: 'Error creating ticket', error: error.message });
    }
};

